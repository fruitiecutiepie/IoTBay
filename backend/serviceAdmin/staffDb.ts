// MODEL // Andrew's Code

import { db } from "../db/initDb";

// Creates the table to store staff uids. This function is called in '/backend/db/initDb.ts' when the database starts or is created.
export const staffDb = () => {
  db.exec( // uid is a primary key to prevent duplicate entries.
    `CREATE TABLE IF NOT EXISTS staffUID (
      uid TEXT NOT NULL PRIMARY KEY 
    );`
  );

  db.exec( // uid is a primary key to prevent duplicate entries.
    `CREATE TABLE IF NOT EXISTS userNumber (
      uid TEXT NOT NULL PRIMARY KEY,
      number TEXT NOT NULL
    );`
  )

  // Sample data to populate the database for demonstration purposes. The uid's correspond with existing
  // user authentication information storedon firebase (a google api).
  db.exec( 
    `INSERT OR REPLACE INTO userNumber (
      uid,
      number
    ) VALUES 
      ('LX3izsvXM7gNBVq8H1djg8Z0PGJ2', '01234567890'),
      ('wY5aiZXxOab4hgSMZatBA0a5jIA2', '01234567890'),
      ('VPXqFmyizuhqbzATHOOCz0PWgKj1', '1058485744'),
      ('8sFGtpcRnBMyu7xWHdbK8GzEzK92', '4865568941'),
      ('FmTGr6MK4DUDZeMwYla9K9Eogom2', '0000000000'),
      ('UIJtv1UHy1VgXo9bdm4GKmTOQgk2', '0465896859'),
      ('eOi10xKignRjc8eQsDJNjyiBHE12', '4866954485'),
      ('htQSZkchUSVnnKf3gpDuz1G6y9x1', '1558649456'),
      ('of03WN9VYTSI6mAomihYsHCL7V13', '1256486945'),
      ('raiD6n4SrrR4PEn9TihNjLZYrxH3', '4656584945'),
      ('lMDRA6V0rNfXRYDqBOlW1H5qdv82', '3456789012'),
      ('xtI6qXlfVtgRkBZUyZ3NN0IxQSl2', '4567890123'),
      ('mAi7vDvu9UX1K5LiNu8DxEUhWTR2', '5678901234'),
      ('oBjSIQygHYgBeLR8fvVwZQZB6N62', '6789012345'),
      ('mq7ogFvnkkRP0PCtJTbkZ3LQXWF2', '7890123456'),
      ('xpVQDyU5AaeBiP8BvUOq6ws487g1', '8901234567'),
      ('IHDglZFfZ1geK6XP1GdTe8yksrl2', '9012345678'),
      ('UfqHLpQwolf7eFuaQcLnM2sm82u2', '1023456789'),
      ('VzaYPloMTwdcKNNzvj2PXe0lcfB3', '2134567890'),
      ('GVydswtcLySbQaqfQwFqgz2Yzoi2', '3245678901'),
      ('k3ArZ2tLIMQqbDs09TB8Cg1mvPu1', '4356789012'),
      ('go4hxoG5RVcLc2FN9pSgc0e7v5M2', '5467890123'),
      ('kEQy0qbg8XThY8ihVfubH9JYNo92', '6578901234'),
      ('2v2PoYE1zLgmZhUaCqSuLfkCcN43', '7689012345'),
      ('H6P5ws8kmqTSLcYndbD84CWQLVo2', '8790123456'),
      ('OthaFiWc3ffcSR5Yi5Wo3I74Rqn2', '9801234567'),
      ('yPEJfAd4ghTJRhIv50LEgBXcIoz1', '1092345678'),
      ('FLz5ZgxTO9UjYH3EnoSeeniplBw2', '2103456789'
    );`
  )

  db.exec(
    `INSERT OR REPLACE INTO staffUID (
      uid
    ) VALUES 
      ('twVZCksAjYY7IK2e4PROBRLuaRF2'),
      ('FmTGr6MK4DUDZeMwYla9K9Eogom2'),
      ('UIJtv1UHy1VgXo9bdm4GKmTOQgk2'),
      ('eOi10xKignRjc8eQsDJNjyiBHE12'),
      ('IHDglZFfZ1geK6XP1GdTe8yksrl2'),
      ('OthaFiWc3ffcSR5Yi5Wo3I74Rqn2'),
      ('FLz5ZgxTO9UjYH3EnoSeeniplBw2'
    );`
  )
}