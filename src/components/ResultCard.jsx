
import React from 'react';

const ResultCard = ({ member }) => {
    const { display_name, age, team } = member;

    // Generate a color based on the team number
    const getTeamColor = (teamStr) => {
        if (!teamStr) return '#c5a059'; // Default Gold

        // Extract number from string (e.g., "1팀" -> 1)
        const num = parseInt(teamStr.replace(/[^0-9]/g, ''), 10);

        // Palette of 10 distinct, premium-feeling colors
        const colors = [
            '#c5a059', // 0 (fallback) - Gold
            '#e05260', // 1 - Soft Red
            '#2e8b57', // 2 - Sea Green
            '#3b82f6', // 3 - Royal Blue
            '#f59e0b', // 4 - Amber/Orange
            '#8b5cf6', // 5 - Violet
            '#06b6d4', // 6 - Cyan/Teal
            '#ec4899', // 7 - Pink/Rose
            '#6366f1', // 8 - Indigo
            '#84cc16', // 9 - Lime
            '#64748b', // 10 - Slate
        ];

        if (!isNaN(num) && num > 0) {
            return colors[num % colors.length];
        }

        // Fallback for non-numeric teams
        let hash = 0;
        for (let i = 0; i < teamStr.length; i++) {
            hash = teamStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    const badgeColor = getTeamColor(team);

    return (
        <div className="ticket-card fade-in" style={{ borderLeftColor: badgeColor }}>
            {/* Title / Header */}
            <div className="ticket-header" style={{ backgroundColor: 'var(--secondary)' }}>
                당신의 삶에 하나님의 사랑과 은혜가 넘치기를 소망합니다.
            </div>

            <div className="ticket-body">
                {/* Left Side: Personal Info */}
                <div className="info-group">
                    <div className="info-row">
                        <span className="label">이름</span>
                        <span className="value">{display_name}</span>
                    </div>
                    {/* Birthdate removed as requested */}
                    <div className="info-row">
                        <span className="label">나이</span>
                        <span className="value">{age}세</span>
                    </div>
                </div>

                {/* Right Side: Team */}
                <div className="team-badge" style={{ backgroundColor: badgeColor }}>
                    <span>{team}</span>
                    <span className="team-label">테이블</span>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
