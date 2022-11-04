import axios from "axios";
import { useState } from "react";

const ShopList = ({ shops, error }) => {
  const [searchText, setSearchText] = useState("");
  const [tempShops, setTempShops] = useState(shops);

  const getSearchData = async () => {
    const res = await axios.get(
      `http://localhost:1337/api/Shops?filters[name][$contains]=${searchText}`
    );
    const resShops = res.data.data;
    setTempShops(resShops);
  };
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <ul>
      <searchBar />
      <label className="text-session" htmlFor="searchName">
        <input
          type="text"
          name="searchBox"
          id="searchName"
          placeholder="Search here"
          value={searchText}
          onChange={handleChange}
        />
      </label>
      <button onClick={() => getSearchData()}>Search</button>
      {tempShops.map((shop) => {
        const id = shop.id;
        const url = `/shop/${id}`;
        return (
          <div key={id}>
            <a href={url}> {shop.attributes.name}</a>
            <h4>{shop.attributes.address_detail}</h4>
            <h4>latitude : {shop.attributes.latitude}</h4>
            <h4>longtitude : {shop.attributes.longitude}</h4>
          </div>
        );
      })}
    </ul>
  );
};
ShopList.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:1337/api/Shops/?populate=*");
    const shops = res.data.data;
    return { shops };
  } catch (error) {
    return { error };
  }
};

export default ShopList;
