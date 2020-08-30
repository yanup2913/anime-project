import React, {useRef} from "react";

export default function Header({searchApiUrl = "", apiCallback}) {
    const searchBoxRef = useRef(null);

    const getResultsOnEnter = ev => {
        if ((ev.keyCode === 13 || ev.which === 13) && typeof apiCallback === "function") {
            apiCallback(ev.target.value);
        }
    };

    const getResults = () => {
        if (typeof apiCallback === "function") {
            apiCallback(searchBoxRef.current.value);
        }
    };

    return (
        <header className="header">
            <div className="search">
                <input
                    ref={searchBoxRef}
                    type="text"
                    className="search-box"
                    placeholder="search for an anime, e.g Naruto"
                    onKeyPress={getResultsOnEnter}
                />
                <button
                    type="button"
                    className="search-box-submit"
                    onClick={getResults}
                >
                    Go
                </button>
            </div>
            <div className="margin-top-default padding-bottom-default break-word">
                Requesting:
                {searchApiUrl.href ?
                    <a
                        className="color-white margin-left-default text-decoration-none"
                        href={searchApiUrl.href}
                        target="_blank"
                    >
                        {searchApiUrl.href}
                    </a>
                    :
                    <span className="color-white margin-left-default">
                        {searchApiUrl}
                    </span>
                }
            </div>
        </header>
    )
}
