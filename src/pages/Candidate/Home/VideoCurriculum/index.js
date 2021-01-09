
import React from 'react'

import { VideoCall } from '@material-ui/icons';
import Button from '../../../../components/CustomButtons';
import Card from '../../../../components/Card';
import CardBody from '../../../../components/Card/CardBody';

export default function VideoCurriculum() {

	return (
		<Card>
			<CardBody>
			<Button type="button" fullWidth color="info" round><VideoCall />Vídeo-curriculum</Button>
			</CardBody>
		</Card>

	)
}
