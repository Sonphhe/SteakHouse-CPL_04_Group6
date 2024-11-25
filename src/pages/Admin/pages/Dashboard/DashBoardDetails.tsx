import React from 'react';
import { TrendingUp, Users, Package } from 'lucide-react';
import BarAnimation from './Chart/BarAnimation';
import ContainerQueries from './Chart/ContainerQueries';
import Example from './Chart/Example';
import LineArea from './Chart/LineArea';
import CustomAxis from './Chart/CustomAxis';
import BasicGauges from './Chart/BasicGauges';
import "./AdminDashboard.css";

const DashBoardDetails = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Welcome to your analytics dashboard</p>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <div className="stats-content">
          <div className="stats-info">
            <p className="stats-label">Sessions</p>
            <div className="stats-value">
              <h2 className="stats-number">98.3K</h2>
              <span className="stats-trend">
                <TrendingUp size={16} />
                +18.77%
              </span>
            </div>
            <p className="stats-period">vs. last week</p>
          </div>
          <div className="stats-icon">
            <Users size={32} />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Analysis</h3>
          </div>
          <div className="chart-content">
            <BarAnimation />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Trend Overview</h3>
          </div>
          <div className="chart-content">
            <LineArea />
          </div>
        </div>
      </div>

      {/* Combined Chart and Gauge */}
      <div className="combined-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Performance Metrics</h3>
          </div>
          <div className="chart-content">
            <CustomAxis />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Goal Completion</h3>
          </div>
          <div className="chart-content">
            <BasicGauges />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {Array(4).fill(null).map((_, index) => (
          <div key={index} className="product-card">
            <div className="product-header">
              <h3 className="product-title">
                <Package size={20} />
                Featured Product
              </h3>
            </div>
            <div className="product-content">
              <ContainerQueries />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardDetails;
