import PropTypes from 'prop-types';
import { Box, Button, useColorModeValue } from '@chakra-ui/react';
// import Plx from 'react-plx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Heading from '../../common/components/Heading';
import Icon from '../../common/components/Icon';
// import { parallax5 } from '../../lib/landing-props';
import Text from '../../common/components/Text';

const Pricing = ({ data }) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFinanceIndex, setSelectedFinanceIndex] = useState(0);
  const [selectedProps, setSelectedProps] = useState({});
  const featuredBg = useColorModeValue('featuredLight', 'featuredDark');

  const financeSelected = {
    0: 'list',
    1: 'finance',
  };
  const financeValue = `${financeSelected[selectedFinanceIndex]}`;
  const selectedItem = data?.pricing[financeValue][selectedIndex];

  console.log('selectedProps:', selectedProps);

  const handleSelect = (dataProps, index) => {
    setSelectedProps(dataProps);
    setSelectedIndex(index);
  };

  return (
    <Box maxW="container.xl" display="flex" width="100%" flexDirection="row" alignItems={{ base: 'center', md: 'start' }} gridGap="21px" m="36px auto 20px auto" justifyContent="center" height="100%">

      <Box display="flex" flex={0.5} flexDirection="column" w="100%" gridGap="10px">
        <Heading size="l" mb="32px">
          {data?.pricing?.title}
        </Heading>
        {data?.pricing?.description && (
          <Text
            size="md"
            width="80%"
            fontWeight="500"
            dangerouslySetInnerHTML={{ __html: data?.pricing?.description }}
          />
        )}
        <Box fontSize="13px" textTransform="uppercase" fontWeight="700" color="blue.default" mb="5px">
          {selectedItem?.bullets?.title}
        </Box>
        <Box as="ul" style={{ listStyle: 'none' }} display="flex" flexDirection="column" gridGap="12px">
          {selectedItem?.bullets?.list?.map((bullet) => (
            <Box as="li" key={bullet?.title} display="flex" flexDirection="row" lineHeight="24px" gridGap="8px">
              <Icon icon="checked2" color="#38A56A" width="13px" height="10px" style={{ margin: '8px 0 0 0' }} />
              <Box
                fontSize="14px"
                fontWeight="600"
                letterSpacing="0.05em"
                dangerouslySetInnerHTML={{ __html: bullet?.title }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box display="flex" flex={0.5} flexDirection="column" gridGap="20px">
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb="6px">
          <Heading as="h2" size="sm">
            Choose yout plan
          </Heading>
          <Box display="flex" gridGap="12px">
            <Box p="15px 33px" onClick={() => setSelectedFinanceIndex(0)} borderRadius="32px" background={selectedFinanceIndex === 0 ? 'blue.default' : 'transparent'} color={selectedFinanceIndex === 0 ? 'white' : 'blue.default'} cursor="pointer">
              One payment
            </Box>
            <Box p="15px 33px" onClick={() => setSelectedFinanceIndex(1)} borderRadius="32px" background={selectedFinanceIndex === 1 ? 'blue.default' : 'transparent'} color={selectedFinanceIndex === 1 ? 'white' : 'blue.default'} cursor="pointer">
              Finance
            </Box>
          </Box>
        </Box>
        {data?.pricing[financeValue].filter((l) => l.show === true).map((item, i) => (
          <>
            {data?.pricing[financeValue]?.length - 1 === i && (
              <Box display="flex" alignItems="center">
                <Box as="hr" color="gray.500" width="100%" />
                <Text size="md" textAlign="center" width="100%" margin="0">
                  Not ready to commit?

                </Text>
                <Box as="hr" color="gray.500" width="100%" />
              </Box>
            )}
            <Box key={item.title} display="flex" onClick={() => handleSelect(item, i)} flexDirection={{ base: 'column', md: 'row' }} width="100%" justifyContent="space-between" p={selectedIndex === i ? '22px 18px' : '26px 22px'} gridGap="24px" cursor="pointer" background={selectedIndex !== i && featuredBg} border={selectedIndex === i && '4px solid #0097CD'} borderRadius="8px">
              <Box display="flex" flex={1} flexDirection="column" gridGap="12px" minWidth={{ base: '100%', md: '288px' }} height="fit-content" fontWeight="400">
                <Box fontSize="18px" fontWeight="700">
                  {item?.title}
                </Box>
                <Text
                  size="md"
                  fontWeight="500"
                  mb="6px"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                />
              </Box>
              <Box display="flex" alignItems="center" gridGap="10px">
                <Heading as="span" size="m" lineHeight="1" textTransform="uppercase" color="blue.default">
                  {item?.price}
                </Heading>
              </Box>
            </Box>
          </>
        ))}
        <Box mt="38px">
          <Button variant="default" onClick={() => router.push(selectedItem?.button?.link)}>
            {selectedItem?.button?.title}
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

Pricing.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Pricing;
