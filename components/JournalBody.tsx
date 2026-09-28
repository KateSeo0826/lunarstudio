import {PortableText, type PortableTextComponents} from "@portabletext/react";
import type {PortableTextBlock} from "@portabletext/types";
import JournalImage from "./JournalImage";
import styles from "./JournalBody.module.css";

const components: PortableTextComponents = {
  types: {
    image: ({value}) => (
      <figure className={styles.figure}>
        <JournalImage image={value} sizes="(max-width: 800px) 100vw, 800px" className={styles.image} />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({children, value}) => {
      const external = /^https?:\/\//.test(value?.href || "");
      const rel = [external ? "noopener noreferrer" : "", value?.affiliate ? "sponsored" : ""].filter(Boolean).join(" ");
      return <a href={value?.href} target={external ? "_blank" : undefined} rel={rel || undefined}>{children}</a>;
    },
  },
};

export default function JournalBody({value}: {value: PortableTextBlock[]}) {
  return <div className={styles.body}><PortableText value={value} components={components} /></div>;
}
