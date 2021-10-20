import React, {useState} from 'react';
import {Select, Typography, Row, Col, Avatar, Card, Input} from 'antd';
import moment from 'moment';
import {useGetCryptoNewsQuery} from '../../services/cryptoNewsApi';
import {log10} from 'chart.js/helpers';
import {useGetCryptosQuery} from '../../services/cryptoApi';

const {Text, Title} = Typography;
const {Option} = Select;

const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const {data} = useGetCryptosQuery(100);
    const {data: cryptoNews} = useGetCryptoNewsQuery({
        newsCategory: newsCategory,
        count: simplified ? 6 : 12,
    });

    if (!cryptoNews?.value) return 'Loading...';

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((item) => (
                            <Option value={item.name}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}

            {cryptoNews?.value.map((item, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={item.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {item.name}
                                </Title>
                                <img
                                    style={{maxWidth: '200px', maxHeight: '100px'}}
                                    src={item?.image?.thumbnail?.contentUrl || demoImageUrl}
                                    alt="news"
                                />
                            </div>
                            <p>
                                {item.description > 100
                                    ? `${item.description.substring(0, 100)}...`
                                    : item.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            item.provider[0]?.image?.thumbnail?.contentUrl ||
                                            demoImageUrl
                                        }
                                        alt="news"
                                    />
                                    <Text className="provider-name">{item.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(item.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
