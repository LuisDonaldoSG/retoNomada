import React from 'react'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {  Row, Col  } from 'antd';
import {useDispatch} from 'react-redux'
import {  setNombreAction } from '../redux/peliculaDuck';
import { withRouter } from 'react-router';

const DragAndDrop = (props) => {

    const dispatch = useDispatch()

    const { Dragger } = Upload;

        const image = {
            name: 'file',
            accept: '.jpg,.png',
            multiple: false,
            action: 'https://whois.nomada.cloud/upload',
            headers: {
                Nomada: "NzVhYmZiMjQtNGI3NC00MWFkLWI2NzUtODZkNGE4Zjk2NDkz",
            },
            method: 'post',
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file.response.actorName, info.fileList);
                }
                if (status === 'done') {
                    dispatch(setNombreAction(info.file.response.actorName))
                    if (info.file.response.actorName === "") {
                        message.error( 'No se reconoció la persona de la foto')
                    }else{
                        message.success(`Esta foto es de ${info.file.response.actorName}.`);
                        props.history.push('/info')
                    } 
                } else if (status === 'error') {
                    message.error( 'Ha ocurrido un error');
                }
            },
            onDrop(e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
        }

    return (
        
        <Row>
            <Col span={12} offset={6} align = 'middle'>
                <h1>¿Quién es este actor?</h1>
                <Dragger {...image}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p
                        className="ant-upload-text"
                        >Haz click o arrastra una imagen
                    </p>
                    <p 
                        className="ant-upload-hint"
                        >Seleciona la foto de un actor para conocer quién es y en qué peliculas ha salido.
                    </p>
                </Dragger>
            </Col>
        </Row>
            
    )
}

export default withRouter (DragAndDrop)
