import React, { useEffect, useState } from "react";
import {
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
// const request = require('request');
// const cheerio = require('cheerio');



const Home = ({ userObj }) => {
    // function(err,res,body){
    //     if(err) throw err;
    //     console.log('body: ', body);
    // });

    const [nweets, setNweets] = useState([]);
    const [movies, setMovies] = useState();
    console.log(movies);
    useEffect(() => {
        (async () => {
            const data = await fetch("/api");
            setMovies(await data.json());
        })()
        // const q = query(
        //     collection(getFirestore(), "nweets"),
        //     //where(conditions),
        //     orderBy('createdAt')
        // );
        // const unsubscribe = onSnapshot(q, querySnapshot => {
        //     const newArray = querySnapshot.docs.map(doc => {
        //         return {
        //             id: doc.id,
        //             ...doc.data(),
        //         };
        //     });
        //     setNweets(newArray);
        //     console.log('Current nweets in CA: ', newArray);
        // });
        // return () => {
        //     unsubscribe();
        // };
    }, []);
    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
            {movies === undefined ? <p>loading...</p> : (
                <ul>
                    {Object.entries(movies).map(([key, value]) => (
                        <li key={key}>
                            <h2>{key}</h2>
                            <ul>
                                {value.map(([time, seat]) => (
                                    <li>{time}: {seat}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Home;