import React, {useEffect, useState} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';
import {useGetCryptosQuery} from '../../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);
    if (isFetching) return 'Loading...';

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        className="elo"
                        placeholder="search Cryptocyrrency"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((item) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={item.id}
                    >
                        <Link to={`/crypto/${item.id}`}>
                            <Card
                                title={`${item.rank}. ${item.name}`}
                                extra={
                                    <img
                                        className="crypto-image"
                                        src={item.iconUrl}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: {millify(item.price)}</p>
                                <p>Market Cap: {millify(item.marketCap)}</p>
                                <p>Daily Change: {millify(item.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
