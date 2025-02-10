import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Navbar} from './Navbar'; 

export const GenerateReport = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/report/getTheVis');
      console.log(response.data); // Log the response from Flask

      // Check if the response indicates success (adjust as per your API response structure)
      if (response.status === 200 && response.data.message === 'CSV files loaded successfully') {
        setIsDataLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <p>Write your content here</p>
        {isDataLoaded && (
          <div>
            <p>Visualization goes here:</p>
            
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateReport;
