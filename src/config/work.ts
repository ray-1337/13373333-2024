type AbandonType = "Discontinued" | "Under Construction";

type WorkType = "website";

type WorkProp = Record<"name" | "description" | "url" | "imageURL", string> & {
  abandonedType?: AbandonType
  embedURL?: string;
  type: WorkType;

  // mama mia
  credits?: Record<string, string | string[] | Record<"name" | "url", string> | Array<Record<"name" | "url", string>>>;

  snapshotURLs?: string[];
};

export default [
  {
    name: "cDev: Dash",
    imageURL: "cdevdash.webp",
    url: "https://dash.cdev.shop/demo",
    description: "A Discord bot dashboard for cDev (Community Development), created with Next.js from scratch.",
    type: "website",
    embedURL: "https://www.youtube-nocookie.com/embed/DQJ8P9kgkwk?rel=0",
    snapshotURLs: ["cdevdash/snapshot/1.webp", "cdevdash/snapshot/2.webp", "cdevdash/snapshot/3.webp"],
    credits: {
      "Concept proposed by": {
        name: "Newton",
        url: "https://github.com/Newtonzz"
      }
    }
  },
  {
    name: "ItchiHuskii's Personal Website",
    imageURL: "itchi.webp",
    description: "Best friend's personal website.",
    abandonedType: "Under Construction",
    type: "website",
    credits: {
      "Concept proposed by": {
        name: "Itchi Husky",
        url: "https://www.instagram.com/itchi.huskii/"
      }
    }
  },
  {
    name: "Nusantara Furry Convention: Hidden Wonderland",
    imageURL: "nufc_2024.webp",
    description: "An upcoming furry convention gathering, which will take place in South Jakarta, Indonesia.",
    url: "https://nusantarafurcon.com",
    type: "website",
    abandonedType: "Discontinued",
    credits: {
      "Client": {
        name: "Nusantara Furry Convention",
        url: "https://instagram.com/nusa_furcon"
      },
      
      "Art provided by": {
        name: "Memu",
        url: "https://www.instagram.com/wolfox_09"
      }
    }
  },
  {
    name: "Personal Project Authorization",
    imageURL: "project-auth.webp",
    description: "Accessing private/in-development personal project by through Discord or Telegram authorization, built with Astro.",
    url: "https://project-authorization.13373333.one"
  },
  {
    name: "13373333.one (2024 Edition)",
    imageURL: "1337.2024.webp",
    url: "https://github.com/ray-1337/13373333-2024",
    description: "The newest open-source repository of this revamped website.",
    snapshotURLs: ["1337.2024/snapshot/1.webp", "1337.2024/snapshot/2.webp"],
  },
  {
    name: "Community Development",
    imageURL: "cdev.webp",
    url: "https://cdev.shop",
    description: "My first remotely startup project to advance limitations around Discord and FiveM communities.",
    credits: {
      "Concept proposed by": {
        name: "Newton",
        url: "https://github.com/Newtonzz"
      }
    }
  },
  {
    name: "YouTube Discord Embed",
    imageURL: "yde.webp",
    url: "https://github.com/ray-1337/youtube-discord-embed",
    description: "Embed YouTube video on Discord, inspired by FixTweet.",
    snapshotURLs: ["yde/snapshot/1.webp"],
    credits: {
      "Hosted on": {
        "name": "Vercel",
        "url": "https://vercel.com"
      }
    }
  },
  {
    name: "Discord Voice Message",
    imageURL: "dvm.webp",
    url: "https://github.com/ray-1337/discord-voice-message",
    description: "Transform .mp3 file to Discord voice message."
  },
  {
    name: "Perceptual Hash",
    imageURL: "phash.webp",
    url: "https://npmjs.com/package/perceptual-hash",
    description: "A simple way to generate content-based image hashes on Node.js, also used on Anti-NSFW."
  },
  {
    name: "Catbox",
    imageURL: "catbox.webp",
    url: "https://13373333.one/catbox",
    description: "A personal/private file storage. Powered by BunnyCDN.",
    abandonedType: "Discontinued"
  },
  {
    name: "Erase Our Memories",
    imageURL: "eom.webp",
    url: "https://github.com/ray-1337/erase-our-memories/",
    description: "A side-project/script to bulk-delete your messages from your exes contact."
  },
  {
    name: "Anti-NSFW",
    imageURL: "antinsfw.webp",
    url: "https://docs.cdev.shop/anti-nsfw/grand-mirage",
    description: "A Discord bot that can detect NSFW content through machine learning.",
    embedURL: "https://www.youtube-nocookie.com/embed/nmPzkVfQLAM?rel=0",
    snapshotURLs: ["antinsfw/snapshot/1.webp", "antinsfw/snapshot/2.webp"],
    credits: {
      "Host provided by": {
        name: "Jpuf",
        url: "https://github.com/Jpuf0"
      }
    }
  },
  {
    name: "GMDI Discord Bot",
    imageURL: "gmdibot.webp",
    url: "https://github.com/ray-1337/gmdi-private-bot/",
    description: "A Discord bot that is made exclusively for Geometry Dash Indonesia."
  },
  {
    name: "Discord & YouTube bot music",
    imageURL: "dbm.webp",
    url: "https://github.com/ray-1337/discord-music-bot/",
    description: "My first Discord Bot music, made from scratch, aiming for simplicity."
  },
  {
    name: "Mountain & Hung / so-vits-svc-4.0",
    imageURL: "m_h_svsf.webp",
    url: "https://huggingface.co/goodfaith/so-vits-svc-4.0-mountain-hung/",
    description: "A voice AI of Mountain & Hung voice actors, trained with 200 epochs."
  },
  {
    name: "CupcakKe (Parody)",
    imageURL: "cupcakke-renewed.webp",
    url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
    description: "A parodies of CupcakKe, remixed by me. i made this because i was simply bored.",
    embedURL: "https://www.youtube-nocookie.com/embed/videoseries?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW&rel=0",
    snapshotURLs: ["cupcakke/snapshot/1.webp", "cupcakke/snapshot/2.webp"]
  },
  {
    name: "VALORANT Funny Moment Edits",
    imageURL: "valorantmoments.webp",
    url: "https://www.youtube.com/playlist?list=PLYrHu4ar33mX9Q32QHk90SoGmZTVovVSI",
    description: "A compilation of VALORANT funny moments edit. Inspired by Jolidofc, edited on Sony Vegas.",
    embedURL: "https://www.youtube-nocookie.com/embed/videoseries?list=PLYrHu4ar33mX9Q32QHk90SoGmZTVovVSI&rel=0"
  },
  {
    name: "IRE (03.12.2021)",
    imageURL: "ire.webp",
    url: "https://soundcloud.com/1337-3333/sets/ire",
    description: "A way to distract me from self-harm, but it didn't help.",
    abandonedType: "Discontinued"
  },
  {
    name: "Blob Project",
    imageURL: "blobproj.webp",
    url: "https://youtube.com/@blobproj",
    description: "Creating a YouTube programming content with no retakes, and no fillers.",
    abandonedType: "Discontinued",
    embedURL: "https://www.youtube-nocookie.com/embed/videoseries?list=PLHSePCXwuwyoFuhV9e23zu1eEjPSVQmmZ&rel=0"
  },
  {
    name: "Discord Bot Concerns",
    imageURL: "article.cdev_fine_grained_security.webp",
    description: "An article about how I tried to tackle an issue that has been persisted for almost 6 years in Discord bots universe.",
    url: "https://medium.com/@diminishedfaith/794b6c7db765"
  }
] as Array<WorkProp>;