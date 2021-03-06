import marked from 'marked';
import { Event } from '@/types/event';

const renderer = new marked.Renderer();
renderer.link = (href: string, title: string, text: string) =>
  `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${
    title || ``
  }">${text}</a>`;

export const getEvents = async () => {
  const url = `${process.env.BASE_URL}/api/events`;
  const response = await fetch(url);
  const { events } = await response.json();
  return events.map((event: Event) => ({
    ...event,
    description: marked(event.description.replace(/\n/g, `<br />`), {
      renderer,
    }),
  }));
};
