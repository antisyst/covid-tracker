import  { useEffect, useState } from "react";
import axios from "axios";

interface IData {
  cases: number;
  todayCases: number;
  deaths: number;
  recovered: number;
  todayRecovered: number;
  todayDeaths: number;
  active: number;
  critical: number;
  affectedCountries: number;
  tests: number;
}

function CovidTracker() {
  const [data, setData] = useState<IData>({ cases: 0, deaths: 0, recovered: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0, active: 0, critical: 0, affectedCountries: 0, tests: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<IData>("https://disease.sh/v3/covid-19/all");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const today: Date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate: string = today.toLocaleDateString('en-US', options);


  return (
    <>
    <div>
      <h1>Real Time COVID-19 Tracker</h1>
      <h3 className="date-content">Date: <span>{formattedDate}</span></h3>
      <div className="container">
        <div className="data_main_item">
          <h2>Cases</h2>
          <h1>{data.cases}</h1>
        </div>
        <div className="data_main_item">
          <h2>Deaths</h2>
          <h1>{data.deaths}</h1>
        </div>
        <div className="data_main_item">
          <h2>Recovered</h2>
          <h1>{data.recovered}</h1>
        </div>

      </div>
      <div className="oth_info">
      <p>Today Cases: <span>{data.todayCases}</span></p>
      <p>Today Recovered: <span>{data.todayRecovered}</span></p>
      <p>Today Deaths: <span>{data.todayDeaths}</span></p>
      <p>Today Deaths: <span>{data.todayDeaths}</span></p>
      <p>Today Deaths: <span>{data.todayDeaths}</span></p>
      <p>active: <span>{data.active}</span></p>
      <p>critical: <span>{data.critical}</span></p>
      <p>tests: <span>{data.tests}</span></p>
      <p>Affected Countries: <span>{data.affectedCountries}</span></p>
      </div>
    </div>
    <br />
    <div className="creator-content">
      <h3>Developed by <a href="https://rmzn.netlify.app" target="_blank">Ramazan Azimli</a></h3>
    </div>
    </>
  );
}

export default CovidTracker;