import React, { useEffect, useRef, useState } from "react";
import {
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
const request = require('request');
const cheerio = require('cheerio');



const Home = ({ userObj }) => {

    request("http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=206%2C04%2C06&theaterCode=0090&date=20220104",
    function(err,res,body){
        if(err) throw err;
        console.log('body: ', body);
    });

    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const q = query(
            collection(getFirestore(), "nweets"),
            //where(conditions),
            orderBy('createdAt')
        );
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const newArray = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setNweets(newArray);
            console.log('Current nweets in CA: ', newArray);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;