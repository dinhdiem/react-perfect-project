import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverView } from "../../../services/apiService";
import "./DashBoard.scss";

const Dashboard = () => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataOverViewChart, setDataOverViewChart] = useState([]);

  const fetchQverView = async () => {
    const res = await getOverView();
    if (res && res.EC === 0) {
      const data = [
        {
          name: "Users",
          us: res.DT.users.total,
        },
        {
          name: "Questions",
          qs: res.DT.others.countQuestions,
        },
        {
          name: "Quizs",
          qz: res.DT.others.countQuiz,
        },
        {
          name: "Answers",
          an: res.DT.others.countAnswers,
        },
      ];
      setDataOverView(res.DT);
      setDataOverViewChart(data);
    }
  };

  useEffect(() => {
    fetchQverView();
  }, []);

  return (
    <div className="doadboard">
      <div className="title">Anlytics DashBoard</div>
      <div className="content">
        <div className="content_left">
          <div className="child">
            <span className="text1">Total Users</span>
            <span className="text2">{dataOverView?.users?.total}</span>
          </div>
          <div className="child">
            <span className="text1">Total Quizz</span>
            <span className="text2">{dataOverView?.others?.countQuiz}</span>
          </div>
          <div className="child">
            <span className="text1">Total Questions</span>
            <span className="text2">
              {dataOverView?.others?.countQuestions}
            </span>
          </div>
          <div className="child">
            <span className="text1">Total Answers</span>
            <span className="text2">{dataOverView?.others?.countAnswers}</span>
          </div>
        </div>
        <div className="content_right">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataOverViewChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="us" fill="#8884d8" />
              <Bar dataKey="qs" fill="#82ca9d" />
              <Bar dataKey="qz" fill="#f75151" />
              <Bar dataKey="an" fill="#2aa8f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
