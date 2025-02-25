import React, { FC } from 'react';
import { Box, Divider, LoadingOverlay, Modal, Text, createStyles } from '@mantine/core';

import { TableSelection } from 'shared/components/table/container/table';

import { IHolidayList } from '../interface/dashboard';

import { getHolidayColumns } from '../constant/constant';

interface IHolidayProps {
	holidayList: IHolidayList[];
	holidayLoading: boolean;
	onClose: () => void;
}
const HolidayList: FC<IHolidayProps> = ({ holidayList, holidayLoading, onClose }) => {
	const useStyles = createStyles(() => ({
		body: {
			height: '500px '
		},
		content: {
			overflow: 'hidden',
			'::-webkit-scrollbar': {
				display: 'none'
			}
		}
	}));
	const { classes } = useStyles();

	return (
		<Box>
			<Modal
				shadow='sm'
				size={'600px'}
				pos={'relative'}
				centered
				padding={20}
				radius='lg'
				withCloseButton={false}
				opened={true}
				onClose={onClose}
				classNames={{ body: classes.body, content: classes.content }}
			>
				<Text ta='center' c={'#071437'} fz={22} fw={600}>
					Holiday List
				</Text>

				<Divider variant='dashed' mt={10} mb={0} />

				{holidayLoading && (
					<LoadingOverlay
						loaderProps={{
							size: 'xl'
						}}
						visible={holidayLoading}
						overlayBlur={2}
					/>
				)}

				<Box
					m={0}
					sx={{
						height: '100%',
						overflow: 'scroll ',
						'&::-webkit-scrollbar': {
							display: 'none'
						}
					}}
				>
					<TableSelection
						key={Math.random()}
						isLoading={false}
						userList={holidayList as any}
						columns={getHolidayColumns()}
						className='table-wrapper'
					/>
				</Box>
			</Modal>
		</Box>
	);
};

export default HolidayList;
