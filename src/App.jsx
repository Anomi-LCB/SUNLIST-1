
import React, { useState, useMemo } from 'react';
import SearchInput from './components/SearchInput';
import ResultCard from './components/ResultCard';
import { searchMembers } from './utils/search';
import data from './data.json'; // Importing extracted JSON

function App() {
    const [query, setQuery] = useState('');

    // Search logic
    const results = useMemo(() => {
        return searchMembers(query, data);
    }, [query]);

    return (
        <>
            <h1 className="title">2026 중직자 선거 투표인 명단</h1>

            <SearchInput value={query} onChange={setQuery} count={results.length} />

            <div className="results-list" style={{ width: '100%' }}>
                {results.length > 0 ? (
                    results.map((member) => (
                        <ResultCard key={member.id} member={member} />
                    ))
                ) : (
                    query.length > 0 && (
                        <div className="empty-state">
                            검색 결과가 없습니다.
                        </div>
                    )
                )}
            </div>

            {/* Initial State / Instructions could go here if query is empty */}
            {query.length === 0 && (
                <div className="empty-state">
                    이름 또는 생년월일(6 or 8자리)을 입력하세요.
                </div>
            )}
        </>
    );
}

export default App;
