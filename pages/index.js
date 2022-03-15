import Head from 'next/head';
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react';


function HomePage(props) {
  
   return (
      <Fragment>
     <Head>
        <title>Meetups</title>    
        <meta name="description" content="Browse a huge list of highly active meetups" />
        
     </Head>
      <MeetupList meetups = {props.meetups} />
      </Fragment>
   )
};

//export async function getServerSideProps(context) {
//   const req = context.rey;
//   const res = context.res;

   /** fetch data */
//   return {
//      props: DUMMY_MEETUPS
//   };
// };

export async function getStaticProps() {
   const client = await MongoClient.connect('mongodb+srv://biggie_1950:NikotinskaKRIZA17!@cluster0.dd3t6.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

   const meetups = await meetupsCollection.find().toArray();

   client.close();

   return {
     props: {
       meetups: meetups.map(meetup => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
       }))
     },
     revalidate: 1
   };
};

export default HomePage;