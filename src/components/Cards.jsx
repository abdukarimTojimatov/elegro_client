import React from "react";

import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_EXPENCES } from "../graphql/queries/expence.query";
import {
  GET_USER_AND_EXPENCES,
  GET_AUTHENTICATED_USER,
} from "../graphql/queries/user.query";

const Cards = () => {
  const { data, loading } = useQuery(GET_EXPENCES);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
  const { data: userAndExpences } = useQuery(GET_USER_AND_EXPENCES, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });
  console.log("userAndExpences", userAndExpences);

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">Barcha harajatlar</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.expences.map((expence) => (
            <Card expence={expence} key={expence._id} />
          ))}
      </div>
      {!loading && data?.expences?.length === 0 && (
        <p classname="flex items-center justify-center text-4xl font-bold text-center w-full">
          Harajatlar mavjud emas
        </p>
      )}
    </div>
  );
};
export default Cards;
