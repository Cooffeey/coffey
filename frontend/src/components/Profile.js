import React, { useState } from 'react';
import './Profile.css';

function Profile() {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [error, setError] = useState('');
    const [accountInfo, setAccountInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleApiKeyChange = (e) => setApiKey(e.target.value);
    const handleApiSecretChange = (e) => setApiSecret(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setAccountInfo(null);

        try {
            const response = await fetch('http://localhost:5000/api/check-api-keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ apiKey, apiSecret }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success) {
                setAccountInfo(data.accountInfo);
            } else {
                setError('Invalid API Key or Secret');
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred while checking API keys.');
        }
    };

    return (
        <div className="profile">
            <h1>Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>API Key:</label>
                    <input type="text" value={apiKey} onChange={handleApiKeyChange} required />
                </div>
                <div>
                    <label>API Secret:</label>
                    <input type="password" value={apiSecret} onChange={handleApiSecretChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Далее'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {accountInfo && (
                <div className="account-info">
                    <h2>Account Information</h2>
                    <p>Balance: {accountInfo.balance}</p>
                    <p>PNL: {accountInfo.pnl}</p>
                    <div>
                        <h3>Last Trades:</h3>
                        {accountInfo.trades.map(trade => (
                            <p key={trade.id}>Symbol: {trade.symbol}, PnL: {trade.pnl}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
