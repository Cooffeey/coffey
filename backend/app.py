from pybit.unified_trading import HTTP
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/check-api-keys', methods=['POST'])
def check_api_keys():
    data = request.json
    api_key = data.get('apiKey')
    api_secret = data.get('apiSecret')

    if not api_key or not api_secret:
        return jsonify({'success': False, 'message': 'API key and secret are required.'}), 400

    # Создаем сессию с Bybit API
    session = HTTP(
        testnet=False,  # если хотите использовать testnet, установите True
        api_key=api_key,
        api_secret=api_secret
    )

    # Получаем баланс
    try:
        response = session.get_wallet_balance(accountType="UNIFIED", coin="USDT")
        balance = response['result']['list'][0]['coin'][0]['walletBalance']
        return jsonify({'success': True, 'balance': balance})
    except Exception as err:
        return jsonify({'success': False, 'message': str(err)}), 400

if __name__ == '__main__':
    app.run(debug=True)
