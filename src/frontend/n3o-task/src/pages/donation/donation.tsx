import { TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "../../components/table";
import {
  fetchAllDonationData,
  fetchLocationsData,
  fetchStatusesData,
  fetchThemesData,
  postDonationData,
} from "../../services/donation";
import { DonationForm } from "./forms";

const columns = (statuses:TObject) => [
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
    filters: statuses,
    onFilter: (value: string, record:TObject) => record.status.id.indexOf(value) === 0,
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
  const [statuses, setStatuses] = useState([]);
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
        const statusesData = await fetchStatusesData();
        fetchAllDonations();
        setLocations(locationsData);
        setThemes(themesData);
        setStatuses(statusesData)
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

  const onChange: TableProps<FormData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
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
        columns={columns(statuses)}
        pagination={false}
        loading={isloading}
        onChange={onChange}
      />
    </div>
  );
};
