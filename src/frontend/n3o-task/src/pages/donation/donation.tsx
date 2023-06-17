import React, { useEffect, useState } from "react";
import { TableWrapper } from "../../components/table";
import {
  fetchAllDonationData,
  fetchLocationsData,
  fetchThemesData,
  postDonationData,
} from "../../services/donation";
import { DonationForm } from "./forms";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Reference",
    dataIndex: ["reference", "type", "prefix"],
    render: (prefix: any, record: any) => `${prefix}${record.reference.number}`,
    key: "reference",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price: any) => `${price.currency.symbol}${price.amount}`|| "",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: ["status", "name"],
    key: "status",
  },
  {
    title: "Location",
    dataIndex: ["location", "name"],
    key: "location",
  },
  {
    title: "Theme",
    dataIndex: ["theme", "name"],
    key: "theme",
  },
];

export const Donation: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [themes, setThemes] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const fetchAllDonations = async () => {
    try {
      setIsloading(true);
      const donationData = await fetchAllDonationData();
      setDonations(donationData);
      setIsloading(false);
    } catch (error) {
      // Handle error
    }
  };
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const locationsData = await fetchLocationsData();
        const themesData = await fetchThemesData();
        fetchAllDonations();
        setLocations(locationsData);
        setThemes(themesData);
      } catch (error) {
        // Handle error
      }
    };

    fetchDataFromAPI();
  }, []);

  const submitDonations = async (requestData: TObject) => {
    await postDonationData(requestData);
    fetchAllDonations();
  };

  return (
    <div>
      <DonationForm
        locations={locations}
        themes={themes}
        submitDonation={(requestData: TObject) => {
          submitDonations(requestData);
        }}
        donations={donations}
      />
      <TableWrapper
        dataSource={donations || []}
        columns={columns}
        pagination={false}
        loading={isloading}
      />
    </div>
  );
};
