import React from 'react';
import {
  RiGroupLine,
  RiBarChartBoxLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiShieldUserLine,
  RiTimeLine,
} from 'react-icons/ri';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1
          style={{
            fontSize: 'var(--fs-2xl)',
            fontWeight: 'var(--fw-bold)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--ls-tight)',
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
          Welcome back! Here's an overview of your application.
        </p>
      </div>

      {/* Overview Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        {[
          {
            icon: <RiGroupLine />,
            label: 'Total Users',
            value: '2,847',
            change: '+12.5%',
            up: true,
            color: 'var(--color-primary)',
            bg: 'var(--color-primary-subtle)',
          },
          {
            icon: <RiBarChartBoxLine />,
            label: 'Revenue',
            value: '$48,295',
            change: '+8.2%',
            up: true,
            color: 'var(--color-success)',
            bg: 'var(--color-success-bg)',
          },
          {
            icon: <RiShieldUserLine />,
            label: 'Active Sessions',
            value: '1,024',
            change: '-3.1%',
            up: false,
            color: 'var(--color-warning)',
            bg: 'var(--color-warning-bg)',
          },
          {
            icon: <RiTimeLine />,
            label: 'Avg. Response',
            value: '245ms',
            change: '-15.3%',
            up: true,
            color: 'var(--color-accent)',
            bg: 'rgba(6, 182, 212, 0.1)',
          },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-lg)',
                  background: stat.bg,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {stat.icon}
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.125rem',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-medium)',
                  color: stat.up ? 'var(--color-success)' : 'var(--color-danger)',
                  background: stat.up ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {stat.up ? <RiArrowUpLine /> : <RiArrowDownLine />}
                {stat.change}
              </span>
            </div>
            <div style={{ fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
        {/* Recent Activity */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
          }}
        >
          <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
            Recent Activity
          </h3>
          {[
            { text: 'New user registered', time: '2 min ago', color: 'var(--color-success)' },
            { text: 'System update completed', time: '15 min ago', color: 'var(--color-primary)' },
            { text: 'User role updated', time: '1 hour ago', color: 'var(--color-warning)' },
            { text: 'Database backup created', time: '3 hours ago', color: 'var(--color-accent)' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) 0',
                borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{item.text}</span>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)' }}>{item.time}</span>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
          }}
        >
          <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
            System Status
          </h3>
          {[
            { label: 'API Server', status: 'Operational', pct: 99.9 },
            { label: 'Database', status: 'Operational', pct: 99.8 },
            { label: 'CDN', status: 'Operational', pct: 100 },
            { label: 'Email Service', status: 'Degraded', pct: 95.2 },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 'var(--space-4)' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{s.label}</span>
                <span
                  style={{
                    fontSize: 'var(--fs-xs)',
                    color: s.pct >= 99 ? 'var(--color-success)' : 'var(--color-warning)',
                    fontWeight: 'var(--fw-medium)',
                  }}
                >
                  {s.status} ({s.pct}%)
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'var(--bg-input)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${s.pct}%`,
                    height: '100%',
                    background: s.pct >= 99
                      ? 'linear-gradient(90deg, var(--color-success), var(--color-success-light))'
                      : 'linear-gradient(90deg, var(--color-warning), #fbbf24)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 1s ease-out',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
