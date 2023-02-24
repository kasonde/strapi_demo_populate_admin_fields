import React from "react";
import { Button } from "@strapi/design-system";
import {
  useCMEditViewDataManager,
  getFetchClient,
} from "@strapi/helper-plugin";

const PrePopulateButton = () => {
  const dataManager = useCMEditViewDataManager();
  const { get } = getFetchClient();

  const handleOnClick = async (event) => {
    console.log(dataManager.modifiedData);
    /**
     * Fetch user info of the current logged in admin user. This works because Strapi
     * is a react app that stores state on the client side. Some of that state is the Auth context
     * (which you don't have to figure out).It just works.
     */
    const userInfoReq = await get("/admin/users/me");
    console.log(userInfoReq);

    // This is an example of fetching some relation information
    const hobbyReq = await get(
      //   "/admin/project-type"
      "/content-manager/relations/api::person.person/hobbies?pageSize=5"
    );
    console.log(hobbyReq);
    const chosenHobby = hobbyReq.data.results[0];
    /** This is an example of populating a field based on the data requests above
     * the data manager exposes an onChange function which once called, allows you to
     * change the state of the form
     */
    dataManager.onChange({
      target: {
        name: "hobbies", // target the "hobbies" field. That's what I want to change
        value: [
          {
            id: chosenHobby.id,
            name: chosenHobby.name,
            mainField: chosenHobby.name,
          },
        ],
      },
    });
    dataManager.onChange({
      target: {
        name: "name", // target the "hobbies" field. That's what I want to change
        value: "Targeted by Injection Zone",
      },
    });
  };
  return (
    <Button variant="secondary" onClick={handleOnClick}>
      Populate Hobbies
    </Button>
  );
};

export default PrePopulateButton;
