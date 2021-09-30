import React from 'react'
import 'antd/dist/antd.css';
import {  Row, Col  } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { actorPerfilAccion, moviesAccion } from '../redux/peliculaDuck';
import { Button, Image, Layout } from 'antd';
import { ArrowLeftOutlined,StarTwoTone  } from '@ant-design/icons';

const InfoActor = (props) => {

    const { Header, Sider, Content } = Layout;
    const dispatch = useDispatch()
    const nombre = useSelector(store => store.peliculas.name)
    const perfil = useSelector(store => store.peliculas.actor)
    const movies = useSelector(store => store.peliculas.movies)


    React.useEffect(() => {
        if (nombre === "") {
            props.history.push('/')
        }else{
            dispatch(actorPerfilAccion(nombre))
            dispatch(moviesAccion(nombre))
        }
    },[nombre,dispatch,props.history])

    return (

        <Layout>
        <Header  className="header-padre">
        <Button type="primary"  onClick={() => props.history.push('/')} icon={<ArrowLeftOutlined />}  >Regresar
          </Button>
        </Header>
            <Layout>
                <Sider theme = 'light' justify="space-around" align="middle" >
                    <Image
                        className = "imagen"
                        width={150}
                        src={perfil.image}
                    />
                    <h4>{perfil.name}</h4>
                    <span className="ant-tag ant-tag-warning">
                        {perfil.gender}
                    </span>
                    <p>Popularidad: {perfil.popularity} </p>
                </Sider>

                <Content >
                    <Header className = "header-hijo">
                        <h1>Películas:</h1>
                    </Header>
 
                    {
                        movies[0] === false ?  (<h1>No hay peliculas que mostrar</h1>) : (
                            movies.map(movie =>(

                                <Layout className = "layout-hijo" key = {movie.id}>
                                    <Header  className = "header-hijo-hijo">
                                        <Row>
                                            <Col flex={2}>
                                                <h2 >{movie.title}</h2>
                                            </Col>
                                            <Col align = 'end' flex={3} >
                                                <h4>{movie.calif}</h4>
                                            </Col>
                                            <Col align = 'end' flex={0} >
                                                <StarTwoTone />
                                            </Col>
                                        </Row>
                                    </Header>
    
                                    <Layout>
                                        <Sider justify="space-around" align="middle" style = {{ backgroundColor: 'white'}}>
                                            <Image
                                                width={150}
                                                src= {movie.image}
                                            />
                                        </Sider>
                                        <Content className="content-hijo">
                                            <p >{movie.overview}</p>
                                            <h4 >Se estrenó el {movie.date}</h4>
                                        </Content>
                                    </Layout>
                                </Layout>
                                
                            ))
                        )
                    }

                </Content>
            </Layout>
        </Layout>


    )
}

export default withRouter(InfoActor) 
