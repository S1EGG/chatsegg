/**
 * Database Queries Module
 * This module provides a collection of functions for interacting with the database.
 * It includes operations for users, chats, messages, documents, and suggestions.
 */

import 'server-only';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { and, asc, desc, eq, gt, gte } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  user,
  chat,
  type User,
  document,
  type Suggestion,
  suggestion,
  type Message,
  message,
  vote,
} from './schema';
import { BlockKind } from '@/components/block';

// Initialize database connection
// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

/**
 * User Management Functions
 */

/**
 * Retrieves a user by their email address
 * @param email - The email address to search for
 * @returns Promise resolving to an array of matching users
 */
export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

/**
 * Creates a new user with the given email and password
 * Password is hashed before storage
 * @param email - User's email address
 * @param password - User's plain text password
 */
export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db.insert(user).values({ email, password: hash });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}

/**
 * Chat Management Functions
 */

/**
 * Creates a new chat session
 * @param id - Unique identifier for the chat
 * @param userId - ID of the user creating the chat
 * @param title - Title of the chat session
 */
export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
    });
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

/**
 * Deletes a chat session and all related data
 * This includes messages and votes associated with the chat
 * @param id - ID of the chat to delete
 */
export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(vote).where(eq(vote.chatId, id));
    await db.delete(message).where(eq(message.chatId, id));

    return await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

/**
 * Retrieves all chats for a specific user
 * Results are ordered by creation date (newest first)
 * @param id - User ID to fetch chats for
 */
export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

/**
 * Retrieves a specific chat by its ID
 * @param id - Chat ID to fetch
 */
export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
}

/**
 * Message Management Functions
 */

/**
 * Saves multiple messages to the database
 * @param messages - Array of messages to save
 */
export async function saveMessages({ messages }: { messages: Array<Message> }) {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

/**
 * Retrieves all messages for a specific chat
 * Results are ordered by creation date (oldest first)
 * @param id - Chat ID to fetch messages for
 */
export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}

/**
 * Voting System Functions
 */

/**
 * Records or updates a vote on a message
 * If a vote already exists, it updates the vote type
 * @param chatId - ID of the chat containing the message
 * @param messageId - ID of the message being voted on
 * @param type - Type of vote ('up' or 'down')
 */
export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: 'up' | 'down';
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(vote)
      .where(and(eq(vote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(vote)
        .set({ isUpvoted: type === 'up' })
        .where(and(eq(vote.messageId, messageId), eq(vote.chatId, chatId)));
    }
    return await db.insert(vote).values({
      chatId,
      messageId,
      isUpvoted: type === 'up',
    });
  } catch (error) {
    console.error('Failed to upvote message in database', error);
    throw error;
  }
}

/**
 * Retrieves all votes for a specific chat
 * @param id - Chat ID to fetch votes for
 */
export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(vote).where(eq(vote.chatId, id));
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
    throw error;
  }
}

/**
 * Document Management Functions
 */

/**
 * Creates a new document
 * @param id - Unique identifier for the document
 * @param title - Document title
 * @param kind - Type of document (text, code, or image)
 * @param content - Document content
 * @param userId - ID of the user creating the document
 */
export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: BlockKind;
  content: string;
  userId: string;
}) {
  try {
    return await db.insert(document).values({
      id,
      title,
      kind,
      content,
      userId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to save document in database');
    throw error;
  }
}

/**
 * Retrieves all versions of a document
 * Results are ordered by creation date (oldest first)
 * @param id - Document ID to fetch versions for
 */
export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(asc(document.createdAt));

    return documents;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

/**
 * Retrieves the most recent version of a document
 * @param id - Document ID to fetch
 */
export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

/**
 * Deletes document versions after a specific timestamp
 * Also deletes related suggestions
 * @param id - Document ID
 * @param timestamp - Timestamp to delete versions after
 */
export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(suggestion)
      .where(
        and(
          eq(suggestion.documentId, id),
          gt(suggestion.documentCreatedAt, timestamp),
        ),
      );

    return await db
      .delete(document)
      .where(and(eq(document.id, id), gt(document.createdAt, timestamp)));
  } catch (error) {
    console.error(
      'Failed to delete documents by id after timestamp from database',
    );
    throw error;
  }
}

/**
 * Suggestion Management Functions
 */

/**
 * Saves multiple suggestions to the database
 * @param suggestions - Array of suggestions to save
 */
export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<Suggestion>;
}) {
  try {
    return await db.insert(suggestion).values(suggestions);
  } catch (error) {
    console.error('Failed to save suggestions in database');
    throw error;
  }
}

/**
 * Retrieves all suggestions for a specific document
 * @param documentId - Document ID to fetch suggestions for
 */
export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await db
      .select()
      .from(suggestion)
      .where(and(eq(suggestion.documentId, documentId)));
  } catch (error) {
    console.error(
      'Failed to get suggestions by document version from database',
    );
    throw error;
  }
}

/**
 * Message Management Functions
 */

/**
 * Retrieves a specific message by its ID
 * @param id - Message ID to fetch
 */
export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(message).where(eq(message.id, id));
  } catch (error) {
    console.error('Failed to get message by id from database');
    throw error;
  }
}

/**
 * Deletes messages from a chat after a specific timestamp
 * @param chatId - Chat ID
 * @param timestamp - Timestamp to delete messages after
 */
export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    return await db
      .delete(message)
      .where(
        and(eq(message.chatId, chatId), gte(message.createdAt, timestamp)),
      );
  } catch (error) {
    console.error(
      'Failed to delete messages by id after timestamp from database',
    );
    throw error;
  }
}

/**
 * Updates the visibility setting of a chat
 * @param chatId - Chat ID to update
 * @param visibility - New visibility setting ('private' or 'public')
 */
export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: 'private' | 'public';
}) {
  try {
    return await db.update(chat).set({ visibility }).where(eq(chat.id, chatId));
  } catch (error) {
    console.error('Failed to update chat visibility in database');
    throw error;
  }
}
