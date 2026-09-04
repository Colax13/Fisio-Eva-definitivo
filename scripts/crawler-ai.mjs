/**
 * Crawler delle AI: leggono i siti per rispondere alle domande di chi le usa
 * o per addestrare i modelli. A differenza di Googlebot e Bingbot, che
 * restano fuori apposta — qui l'obiettivo è farsi leggere dalle AI, non
 * comparire sui motori di ricerca tradizionali.
 *
 * ⚠️ Ogni azienda pubblica e aggiorna la propria lista nel tempo: questa non
 * è definitiva, è una fotografia di quello che è documentato pubblicamente.
 * Va ricontrollata di tanto in tanto sulle pagine ufficiali (openai.com/gptbot,
 * anthropic.com, docs.perplexity.ai e simili), soprattutto se un fornitore ne
 * pubblica uno nuovo.
 */
export const CRAWLER_AI = [
  { agente: 'GPTBot', nota: 'OpenAI — scansione per addestrare e migliorare i modelli' },
  { agente: 'ChatGPT-User', nota: 'OpenAI — quando ChatGPT apre una pagina su richiesta di chi lo usa' },
  { agente: 'OAI-SearchBot', nota: 'OpenAI — indicizzazione per la ricerca di ChatGPT' },
  { agente: 'ClaudeBot', nota: 'Anthropic — scansione per Claude' },
  { agente: 'Claude-User', nota: 'Anthropic — quando Claude apre una pagina su richiesta di chi lo usa' },
  { agente: 'Claude-SearchBot', nota: 'Anthropic — indicizzazione per la ricerca di Claude' },
  { agente: 'PerplexityBot', nota: 'Perplexity — scansione per la ricerca' },
  { agente: 'Perplexity-User', nota: 'Perplexity — quando risponde a una richiesta di chi lo usa' },
  { agente: 'Google-Extended', nota: "Google — uso dei contenuti per Gemini, distinto da Googlebot" },
  { agente: 'Applebot-Extended', nota: 'Apple — uso dei contenuti per Apple Intelligence' },
  { agente: 'Meta-ExternalAgent', nota: 'Meta — scansione per le AI di Meta' },
  { agente: 'Amazonbot', nota: 'Amazon — include funzioni legate ad Alexa' },
  { agente: 'CCBot', nota: "Common Crawl — l'archivio pubblico su cui molti modelli si addestrano" },
  { agente: 'DuckAssistBot', nota: 'DuckDuckGo — la funzione di risposta assistita da AI' },
  { agente: 'Bytespider', nota: 'ByteDance' },
];
