const express = require('express');
const cors = require('cors'); 
const { QrCodePix } = require('qrcode-pix');

const app = express();
app.use(cors());

app.get('/generate-qr', async (req, res) => {
    try {
        // Obtém o valor do Pix a partir do parâmetro da URL
        const preco = parseFloat(req.query.value); 

        if (isNaN(preco) || preco <= 0) {
            return res.status(400).json({ error: 'Valor inválido' });
        }

        const qrCodePix = QrCodePix({
            version: '01',
            key: 'johnloquesa@gmail.com', // Substitua pela chave Pix desejada
            name: 'Joaozinho',
            city: 'BRASILIA',
            cep: '28360000',
            value: preco, // Valor em reais
            transactionId: 'Vandal Xiter - SHOP',
        });

        const qrCode = await qrCodePix.base64();
        res.json({ qrCode }); // Retorna a imagem base64 do QR Code
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
});

app.listen(65535, () => {
    console.log('Servidor rodando na porta 65535');
});
