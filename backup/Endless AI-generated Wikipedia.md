excited to see how obscure the pages can get (for instance, can you get to eventually get to Neon Genesis Evangelion from the root page?) It would defeat the purpose if you could just manually go to /wiki/neon-genesis-evangelion in the address bar. To defeat that, I make each link have a origin=slug query parameter, and then I fetch the origin page server-side to validate that it does indeed contain a link to the page you’re navigating to[2](https://www.seangoedecke.com/endless-wiki/#fn-2).

Final thoughts
Like [AutoDeck](https://www.seangoedecke.com/autodeck), EndlessWiki represents another step in my “what if you could interact with LLMs without having to chat” line of thought. I think there’s a lot of potential here for non-toy features. For instance, what if ChatGPT automatically hyperlinked each proper noun in its responses, and clicking on those generated a response focused on that noun?

[Anyway, check it out!](https://www.endlesswiki.com/)

edit: this got some comments on Hacker News [here](https://news.ycombinator.com/item?id=45370760). Commenters are rightfully amused that I said I wasn’t worried about inference cost, and then immmediately got bit by inference cost. They also think the traffic I was seeing was coming from search engine crawlers, which is plausible.

edit: I’ve just attempted to slow down some of the crawlers by rewriting the new-article outgoing links to be clickable divs instead of actual <a> tags. Obviously this won’t defeat a sophisticated crawler, but it seems to be having some effect.

edit: https://infinipedia.ai/ is another implementation of this idea. It does more AI-driven edits, which is interesting. The visualisation is also better, but I like my more Wikipedia-esque styling.