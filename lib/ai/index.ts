import { createOpenAI } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';


const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'compatible', // strict mode, enable when using the OpenAI API
  baseURL: process.env.OPENAI_BASE_URL, // 使用供应商的url
  apiKey: process.env.OPENAI_API_KEY, // 使用供应商的apikey
});

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
