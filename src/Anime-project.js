import React, {useEffect, useState, useRef} from 'react';
import './anime.css';
import AnimeCard from "./anime-card";
import Header from "./header";
import {fireLazyLoadEvent} from "./fire-lazy-load-event";

/* CONSTANTS */
const API_URL = "https://api.jikan.moe/v3/search/anime";

export default function AnimeProject() {
    const [animes, setAnimes] = useState([]);
    const [headerReqStatus, setHeaderReqStatus] = useState("API Request URL will appear here");
    const [isLoadingAnimes, setIsLoadingAnimes] = useState(false);
    const searchQuery = useRef("");
    const currentPage = useRef(1);
    const controller = useRef({});

    const fetchAnimes = (page=1) => {
        setHeaderReqStatus("fetching......");
        let reqUrl = new URL(API_URL);
        reqUrl.search = new URLSearchParams({
            limit: 20,
            q: searchQuery.current || "",
            page,
        });
        controller.current = new AbortController();
        currentPage.current = page;

        fetch(reqUrl, {
            method: "Get",
            signal: controller.current.signal,
        }).then(res => res.json())
            .then(({results}) => {
                setHeaderReqStatus(reqUrl);
                let newResults = results;
                if(page > 1) {
                    newResults = animes.concat(results);
                }
                setAnimes(newResults);
                setIsLoadingAnimes(false);
                fireLazyLoadEvent();
        }).catch(() => {
            if(page > 1) {
                currentPage.current --;
            }
            setHeaderReqStatus("Error occured while fetching data. Please try again");
            setIsLoadingAnimes(false);
        });
    };

    const setLoader = (query = "", page= 1) => {
        if (query.length < 2) {
            alert("Error: Requires atleast 3 or more characters");
            return false;
        }
        searchQuery.current = query;
        currentPage.current = page;
        if (isLoadingAnimes) {
            controller.current.abort();
            fetchAnimes();
        } else {
            setIsLoadingAnimes(true);
        }
    };

    useEffect(() => {
        if (isLoadingAnimes) {
            fetchAnimes(currentPage.current);
        }
    }, [isLoadingAnimes]);

    const loadMoreAnimes = () => {
        if(!isLoadingAnimes) {
            currentPage.current++;
            setIsLoadingAnimes(true);
        }
    };

    return (
        <div className="app">
            <Header apiCallback={setLoader} searchApiUrl={headerReqStatus}/>
            <div className="card-wrapper">
                {!!animes.length && (
                    [...animes, {}].map(anime => {
                        if(!Object.keys(anime).length) {
                            return (
                                <div className="load-more-btn">
                                    <button type="button" onClick={loadMoreAnimes} className="padding-default">
                                        {isLoadingAnimes ? "Loading...." : "Load More"}
                                    </button>
                                </div>
                            )
                        }
                        return (
                            <AnimeCard {...{anime}} key={anime.mal_id}/>
                        )
                    })
                )}
            </div>
            {(!animes.length && headerReqStatus.href) && (
                <div className="error-message">No Result found</div>
            )}
        </div>
    );
}
