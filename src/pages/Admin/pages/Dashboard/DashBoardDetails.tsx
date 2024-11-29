import React from 'react';
import { TrendingUp, Users, Package } from 'lucide-react';
import BarAnimation from './Chart/BarAnimation';
import ContainerQueries from './Chart/ContainerQueries';
import Example from './Chart/Example';
import LineArea from './Chart/LineArea';
import CustomAxis from './Chart/CustomAxis';
import BasicGauges from './Chart/BasicGauges';

const DashBoardDetails = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      marginLeft: '50px',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '30px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#333',
        }}>Dashboard Overview</h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#888',
        }}>Welcome to your analytics dashboard</p>
      </div>

      {/* Stats Card */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#777',
          }}>Sessions</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
          }}>
            <h2>98.3K</h2>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              color: '#10b981',
            }}>
              <TrendingUp size={16} />
              +18.77%
            </span>
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: '#777',
          }}>vs. last week</p>
        </div>

        {/* Add more stat cards here */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#777',
          }}>Active Users</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
          }}>
            <h2>34.7K</h2>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              color: '#F59E0B',
            }}>
              <TrendingUp size={16} />
              +9.45%
            </span>
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: '#777',
          }}>vs. last week</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div
  style={{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'stretch', 
    gap: '30px', 
    marginTop: '30px',
  }}
>
  {/* Card 1 */}
  <div
    style={{
      flex: 1, 
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <h3
      style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333',
      }}
    >
      Revenue Analysis
    </h3>
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '300px',
        overflow: 'hidden',
      }}
    >
      <BarAnimation />
    </div>
  </div>

  {/* Card 2 */}
  <div
    style={{
      flex: 1, 
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <h3
      style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333',
      }}
    >
      Trend Overview
    </h3>
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '300px',
        overflow: 'hidden',
      }}
    >
      <LineArea />
    </div>
  </div>
</div>




      {/* Combined Chart and Gauge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '30px',
        marginTop: '30px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '48%',
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333',
          }}>Performance Metrics</h3>
          <div>
            <CustomAxis />
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '48%',
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333',
          }}>Goal Completion</h3>
          <div>
            <BasicGauges />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '30px',
    justifyContent: 'center', 
    alignItems: 'center',
  }}
>
  {Array(4)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333',
          }}
        >
          <Package size={20} />
          Featured Product
        </h3>
        <div
  style={{
    display: 'flex',       
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%',         
    overflow: 'hidden',     
  }}
>
  <ContainerQueries />
</div>

      </div>
    ))}
</div>

    </div>
  );
};

export default DashBoardDetails;
