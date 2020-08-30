import React from "react";
import SimpleImage from "./simple-image";

export default function AnimeCard({anime: {image_url: coverImage, url, title}}) {
    return (
        <a
            href={url}
            title={title}
            target="_blank"
            className="text-decoration-none anime-card"
        >
            <SimpleImage src={coverImage} alt={title}/>
            <div className="anime-card-title break-word">{title}</div>
        </a>
    )
}
