'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDebounce } from '../utils';

interface SearchResult {
  id: number;
  name: string;
  email: string;
}

interface SearchResponse {
  results: SearchResult[];
  query: string;
}

function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [callCount, setCallCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      setCallCount(prev => prev + 1);
      axios.get<SearchResponse>(`http://localhost:8000/api/search?q=${debouncedQuery}`)
        .then(res => {
          setResults(res.data.results);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  return (
    <div style={{ border: '2px solid #4CAF50', borderRadius: '8px', padding: '20px', margin: '10px', backgroundColor: '#f9fff9' }}>
      <h2 style={{ color: '#4CAF50', marginBottom: '15px' }}>🟢 検索 (Debouncing有り - 300ms遅延)</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="名前またはメールで検索..."
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          fontSize: '16px'
        }}
      />
      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          API呼び出し回数: <span style={{ color: '#4CAF50', fontSize: '18px' }}>{callCount}</span>
          {isLoading && <span style={{ marginLeft: '10px', color: '#666' }}>🔄 検索中...</span>}
        </p>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {results.length > 0 ? (
          results.map(result => (
            <div key={result.id} style={{ 
              padding: '10px', 
              borderBottom: '1px solid #eee',
              backgroundColor: '#fff',
              marginBottom: '5px',
              borderRadius: '4px'
            }}>
              <strong style={{ color: '#333' }}>{result.name}</strong>
              <br />
              <span style={{ color: '#666', fontSize: '14px' }}>{result.email}</span>
            </div>
          ))
        ) : query && !isLoading ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>検索結果が見つかりません</p>
        ) : null}
      </div>
    </div>
  );
}

function SearchWithoutDebounce() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [callCount, setCallCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setCallCount(prev => prev + 1);
      axios.get<SearchResponse>(`http://localhost:8000/api/search?q=${query}`)
        .then(res => {
          setResults(res.data.results);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div style={{ border: '2px solid #f44336', borderRadius: '8px', padding: '20px', margin: '10px', backgroundColor: '#fff9f9' }}>
      <h2 style={{ color: '#f44336', marginBottom: '15px' }}>🔴 検索 (Debouncing無し - 即座に実行)</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="名前またはメールで検索..."
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          fontSize: '16px'
        }}
      />
      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#ffeaea', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          API呼び出し回数: <span style={{ color: '#f44336', fontSize: '18px' }}>{callCount}</span>
          {isLoading && <span style={{ marginLeft: '10px', color: '#666' }}>🔄 検索中...</span>}
        </p>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {results.length > 0 ? (
          results.map(result => (
            <div key={result.id} style={{ 
              padding: '10px', 
              borderBottom: '1px solid #eee',
              backgroundColor: '#fff',
              marginBottom: '5px',
              borderRadius: '4px'
            }}>
              <strong style={{ color: '#333' }}>{result.name}</strong>
              <br />
              <span style={{ color: '#666', fontSize: '14px' }}>{result.email}</span>
            </div>
          ))
        ) : query && !isLoading ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>検索結果が見つかりません</p>
        ) : null}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>🔍 Debouncing比較デモ</h1>
        <p style={{ color: '#666', fontSize: '16px', maxWidth: '800px', margin: '0 auto' }}>
          両方の検索フィールドに同じテキストを<strong>素早く</strong>入力して、API呼び出し回数の違いを確認してください。<br />
          Debouncing有りでは入力が止まってから300ms後にAPI呼び出しが実行されます。
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '400px' }}>
          <SearchWithDebounce />
        </div>
        <div style={{ flex: '1', minWidth: '400px' }}>
          <SearchWithoutDebounce />
        </div>
      </div>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '30px auto 0'
      }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>💡 使い方のヒント</h3>
        <ul style={{ color: '#666', lineHeight: '1.6' }}>
          <li>「Alice」や「Bob」などの名前を素早く入力してみてください</li>
          <li>メールアドレスの一部（「@example」など）でも検索できます</li>
          <li>文字を削除したり追加したりして、API呼び出し回数の違いを観察してください</li>
          <li>Debouncing有りでは、入力を止めるまでAPI呼び出しが遅延されます</li>
        </ul>
      </div>
    </div>
  );
}
