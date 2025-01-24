import React from "react";

import { useQuery } from "@apollo/client";
import SharingCard from "./SharingCard";
import { GET_SHARINGS } from "../graphql/queries/sharing.query";
import {
  GET_USER_AND_EXPENCES,
  GET_AUTHENTICATED_USER,
} from "../graphql/queries/user.query";

const SharingCards = () => {
  const { data, loading } = useQuery(GET_SHARINGS);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
  const { data: userAndExpences } = useQuery(GET_USER_AND_EXPENCES, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">Barcha harajatlar</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.sharings?.map((sharing) => (
            <SharingCard sharing={sharing} key={sharing._id} />
          ))}
      </div>
      {!loading && data?.sharings?.length === 0 && (
        <p classname="flex items-center justify-center text-4xl font-bold text-center w-full">
          Harajatlar mavjud emas
        </p>
      )}
    </div>
  );
};
export default SharingCards;
