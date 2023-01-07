import React, { useState, Fragment } from "react";
import "./App.css";
import users from "./data/users.json";
import UserInfo from "./components/userInfo";
const App = () => {
  const [data] = useState(users);

  return (
    <Fragment>
      <div className="container px-2">
        <UserInfo
          data={data}
          itemsPerPage={10}
          searchByData={[
            { label: "USERNAME", value: "username" },
            { label: "FIRST NAME", value: "first_name" },
            { label: "LAST NAME", value: "last_name" },
            { label: "EMAIL", value: "email" },
            { label: "GENDER", value: "gender" },
            { label: "DOB", value: "dob" },
            { label: "COUNTRY", value: "country" },
          ]}
        />
      </div>
    </Fragment>
  );
};

export default App;
