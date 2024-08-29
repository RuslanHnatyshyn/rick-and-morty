"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pagesPerGroup = 10;
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const endpoint = searchQuery
        ? `${defaultEndpoint}?page=${page}&name=${searchQuery}`
        : `${defaultEndpoint}?page=${page}`;

      const res = await fetch(
        `${defaultEndpoint}?page=${page}&name=${searchQuery}`
      );
      const data = await res.json();

      if (data.results) {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } else {
        setCharacters([]);
        setTotalPages(1);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, searchQuery]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePreviousGroup = () => {
    setCurrentGroup((prev) => Math.max(prev - 1, 0));
  };

  const handleNextGroup = () => {
    setCurrentGroup((prev) =>
      Math.min(prev + 1, Math.floor(totalPages / pagesPerGroup))
    );
  };

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Rick and Morty Characters</h1>

      <div className={styles.links}>
        <Link className={styles.episodes} href="/episodes">
          Episodes
        </Link>
        <Link className={styles.locations} href="/locations">
          Locations
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.search}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.list}>
          {characters.length > 0 ? (
            characters.map((character) => (
              <li className={styles.card} key={character.id}>
                <img
                  className={styles.cardImg}
                  src={character.image}
                  alt={character.name}
                />

                <div className={styles.cardText}>
                  <Link href={`/character/${character.id}`}>
                    <h2>{character.name}</h2>
                  </Link>
                  <p>
                    {character.status} - {character.species}
                  </p>
                  <p>
                    <strong>Last known location:</strong>{" "}
                    {character.location.name}
                  </p>
                  <p>
                    <strong>First seen in:</strong> {character.origin.name}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No characters found.</p>
          )}
        </ul>
      )}

      <div className={styles.pagination}>
        <button onClick={handlePreviousGroup} disabled={currentGroup === 0}>
          Previous
        </button>
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            disabled={page === pageNum}
          >
            {pageNum}
          </button>
        ))}
        <button onClick={handleNextGroup} disabled={endPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
