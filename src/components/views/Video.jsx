import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navegadora from '../global';
import '../../css/videos.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Video() {
  const [videosVisible, setVideosVisible] = useState(true);
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([{link: null}]);
  const navigate = useNavigate();
  let nombreVideo = useParams();
  const fetchDataFromApi = async () => {
    try {
      const response = await(await fetch(`http://192.168.129.72:5072/niggacademy/contenido/${nombreVideo['curso']}/${nombreVideo['seccion']}`, {
          method: "GET",
          headers: {
              'Accept-version': '1.0.0',
              'Authorization': `Bearer ${localStorage.token}`
          }
      })).json();
      if(response.status == 200){
        setInfo(response);
      }else{
        console.log(response.message)
      }
    } catch (error) {
      console.log(error)
    }
};
    const fetchVideo = async () => {
    try {
      const response = await(await fetch(`http://192.168.129.72:5072/niggacademy/contenido/${nombreVideo['curso']}/${nombreVideo['seccion']}/${nombreVideo['video']}`, {
          method: "GET",
          headers: {
              'Accept-version': '1.0.0',
              'Authorization': `Bearer ${localStorage.token}`
          }
      })).json();
      if(response.status == 400){
        console.log(response.status);
      }else{
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
    };
  const verifyToken = () => {
    if (!localStorage.token) return navigate('/login');
  };

  const toggleVideosVisibility = () => {
    setVideosVisible(!videosVisible);
  };

  useEffect(() => {
    fetchDataFromApi()
    verifyToken();
  }, []);
  return (
    <>
      <Navegadora />
      <div className="lotienetodo">
        <div className="videopaver">
          <div className="cargando">
            <video src={data[0].link} preload="auto" controls width="100%" height="100%"></video>
            <iframe src={data[0].link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
          <button className="ola" onClick={toggleVideosVisibility}>
          →
          </button>
        </div>
        <div className={`videos ${videosVisible ? '' : 'hidden'}`}>
          <div className="demasvideos">
            <table>
                <tbody>
                    {info.length > 0 ? (
                    info.map((item, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td><h3><Link to={`/contenido/${nombreVideo['curso']}/${nombreVideo['seccion']}/${item.nombre}`} onClick={() => fetchVideo()}>{item.nombre}</Link></h3></td>
                        </tr>
                        </React.Fragment>
                    ))
                    ) : (
                    <tr>
                        <td  className="wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;