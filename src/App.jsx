import React, { useState, useEffect } from "react";
import './App.css'

const App = () => {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [editID,setEditID] = useState(null);
  const [mount, setMount] = useState(false);
  const [errors,setErrors] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("list"));
    setList(saved || []);
    setMount(true);
  }, []);

  useEffect(() => {
    if (mount) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list, mount]);

  const cities = ["Navsari", "Surat", "Vadodara"];

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name == "hobby") {
      let newHobby = hobby;
      if (newHobby.includes(value)) {
        newHobby = newHobby.filter((val) => val != value);
      } else {
        newHobby.push(value);
      }
      value = newHobby;
      setHobby(newHobby);
    }
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
  let newErrors = {};

  if (!user.username || user.username.trim() === "") {
    newErrors.username = "Username is required.";
  }
  if (!user.email || user.email.trim() === "") {
    newErrors.email = "Email is required.";
  }
  if (!user.password || user.password.trim() === "") {
    newErrors.password = "Password is required.";
  }
  if (!user.gender || user.gender.trim() === "") {
    newErrors.gender = "Gender is required.";
  }
  if (hobby.length === 0) {
    newErrors.hobby = "Hobby is required.";
  }
  if (!user.city || user.city.trim() === "") {
    newErrors.city = "City is required.";
  }
  if (!user.address || user.address.trim() === "") {
    newErrors.address = "Address is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if(editID){
      let newList = list;
      newList = newList.map((val)=>{
        if(val.id == editID){
          return {...val,...user}
        }
        return val;
      })
      setList(newList);
      setEditID(null);
    }else{
      setList([...list, { ...user, id: Date.now() }]);
    }
    setUser({});
    setHobby([]);
  };

  const handleDelete = (id) => {
    let data = list.filter((val) => val.id != id);
    setList(data);
  };

  const handleEdit = (id) => {
    const data = list.find((val) => val.id === id);
    setUser(data);
    setHobby(data.hobby || []);
    setEditID(id);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form action="" method="post" onSubmit={handleSubmit}>
              <h2 className="text-center mt-2">Registration Form</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-lable">
                  Username :
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  value={user.username || ""}
                  onChange={handleChange}
                />
                {errors.username && <small className="text-danger fw-semibold">{errors.username}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-lable">
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-danger fw-semibold">{errors.email}</small>}

              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-lable">
                  Password :
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
                {errors.password && <small className="text-danger fw-semibold">{errors.password}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-lable">
                  Gender :
                </label>
                <div className="form-check form-check-inline mx-2 align-middle">
                  <input
                    className="form-check-input align-middle"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={user.gender == "male" ? true : false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="gender">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={user.gender == "female" ? true : false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="gender">
                    Female
                  </label>
                </div>
                {errors.gender && <small className="text-danger fw-semibold">{errors.gender}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="hobby" className="form-lable">
                  Hobby :
                </label>
                <div className="form-check form-check-inline mx-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobby"
                    id="reading"
                    value="reading"
                    checked={hobby.includes("reading")}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="hobby">
                    Reading
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobby"
                    id="writing"
                    value="writing"
                    checked={hobby.includes("writing")}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="hobby">
                    Writing
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobby"
                    id="coding"   
                    value="coding"
                    checked={hobby.includes("coding")}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="hobby">
                    Coding
                  </label>
                </div>
                {errors.hobby && <small className="text-danger fw-semibold">{errors.hobby}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <select
                  className="form-select"
                  value={user.city || ""}
                  name="city"
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    --- select city ---
                  </option>
                  {cities.map((city) => (
                    <option value={city} selected={user.city == city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <small className="text-danger fw-semibold">{errors.city}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-lable">
                  Address :
                </label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    id="address"
                    style={{ height: 100 }}
                    value={user.address || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="address">Address</label>
                </div>
                {errors.address && <small className="text-danger fw-semibold">{errors.address}</small>}
              </div>
              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mb-3">
        <div className="row">
          <div className="col-12">
            <table className="table table-striped table-bordered table-hover table-responsive text-center caption-top">
              <caption className="text-center">
                <h2 className="text-black">User Data</h2>
              </caption>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Gender</th>
                  <th>Hobby</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((val, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{val.username}</td>
                      <td>{val.email}</td>
                      <td>{val.password}</td>
                      <td>{val.gender}</td>
                      <td>{val.hobby.join(", ")}</td>
                      <td>{val.city}</td>
                      <td className="address-cell">{val.address}</td>
                      <td>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => handleDelete(val.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(val.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>Data Not Found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
