import React, { FC } from 'react';
import {
    Avatar,
    Box,
    Divider,
    Flex,
    Modal,
    Text,
    createStyles,
} from '@mantine/core';
import { TeamDetail } from '../interface/project';

interface ITeamProfileProps {
    teamInfo: TeamDetail[];
    setTeamInfo: (value) => void;
}
const TeamProfile: FC<ITeamProfileProps> = ({ teamInfo, setTeamInfo }) => {
    const useStyles = createStyles(() => ({
        content: {
            overflow: 'auto',
            '::-webkit-scrollbar': {
                display: 'none',
            },
        },
    }));

    const { classes } = useStyles();
    return (
        <Modal
            shadow='sm'
            size={'1000px'}
            pos={'relative'}
            centered
            padding={20}
            radius='lg'
            withCloseButton={false}
            opened={true}
            onClose={() => {
                setTeamInfo([]);
            }}
            classNames={{ content: classes.content }}>
            <Text ta='center' c={'#071437'} fz={26} fw={600}>
                Our Great Team
            </Text>
            <Divider variant='dashed' mb={20} mt={10} />
            <Box>
                <Flex
                    wrap={'wrap'}
                    justify={'center'}
                    align={'center'}
                    m={'0 auto'}
                    w={'100%'}>
                    {teamInfo.map(
                        ({ avatar, realName, id, designation }: TeamDetail) => {
                            return (
                                <Flex
                                    w={180}
                                    h={'auto'}
                                    direction={'column'}
                                    align={'center'}
                                    key={id}
                                    className='box-container'
                                    mb={40}>
                                    <Avatar
                                        w={80}
                                        h={80}
                                        style={{
                                            borderRadius: '0',
                                            clipPath:
                                                'polygon(46.1731656763% .7612046749%,47.411809549% .3407417371%,48.6947380778% .0855513863%,50% 0,51.3052619222% .0855513863%,52.588190451% .3407417371%,53.8268343237% .7612046749%,82.1111055711% 12.4769334274%,83.2842712475% 13.0554747147%,84.3718855375% 13.7821953496%,85.3553390593% 14.6446609407%,86.2178046504% 15.6281144625%,86.9445252853% 16.7157287525%,87.5230665726% 17.8888944289%,99.2387953251% 46.1731656763%,99.6592582629% 47.411809549%,99.9144486137% 48.6947380778%,100% 50%,99.9144486137% 51.3052619222%,99.6592582629% 52.588190451%,99.2387953251% 53.8268343237%,87.5230665726% 82.1111055711%,86.9445252853% 83.2842712475%,86.2178046504% 84.3718855375%,85.3553390593% 85.3553390593%,84.3718855375% 86.2178046504%,83.2842712475% 86.9445252853%,82.1111055711% 87.5230665726%,53.8268343237% 99.2387953251%,52.588190451% 99.6592582629%,51.3052619222% 99.9144486137%,50% 100%,48.6947380778% 99.9144486137%,47.411809549% 99.6592582629%,46.1731656763% 99.2387953251%,17.8888944289% 87.5230665726%,16.7157287525% 86.9445252853%,15.6281144625% 86.2178046504%,14.6446609407% 85.3553390593%,13.7821953496% 84.3718855375%,13.0554747147% 83.2842712475%,12.4769334274% 82.1111055711%,.7612046749% 53.8268343237%,.3407417371% 52.588190451%,.0855513863% 51.3052619222%,0 50%,.0855513863% 48.6947380778%,.3407417371% 47.411809549%,.7612046749% 46.1731656763%,12.4769334274% 17.8888944289%,13.0554747147% 16.7157287525%,13.7821953496% 15.6281144625%,14.6446609407% 14.6446609407%,15.6281144625% 13.7821953496%,16.7157287525% 13.0554747147%,17.8888944289% 12.4769334274%)',
                                        }}
                                        src={avatar}
                                    />

                                    <Text
                                        ta={'center'}
                                        mt={10}
                                        c={'#071437'}
                                        fz={14}
                                        fw={600}>
                                        {realName}
                                    </Text>
                                    <Text
                                        truncate
                                        w={150}
                                        ta={'center'}
                                        c={'#99A1B7'}
                                        fz={12}
                                        fw={600}>
                                        {designation
                                            ? designation
                                            : 'Team Member'}
                                    </Text>
                                </Flex>
                            );
                        }
                    )}
                </Flex>
            </Box>
        </Modal>
    );
};

export default TeamProfile;
