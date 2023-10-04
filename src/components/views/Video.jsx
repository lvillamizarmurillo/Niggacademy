import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navegadora from '../global';
import '../../css/videos.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Video() {
  const [videosVisible, setVideosVisible] = useState(true);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  let nombreVideo = useParams();
  console.log(nombreVideo);
  const fetchDataFromApi = async () => {
    try {
      const response = await(await fetch(`http://127.16.15.14:5072/niggacademy/contenido/${nombreVideo['curso']}/${nombreVideo['seccion']}`, {
          method: "GET",
          headers: {
              'Accept-version': '1.0.0',
              'Authorization': `Bearer ${localStorage.token}`
          }
      })).json();
      setInfo(response);
    } catch (error) {
      console.log(error);
    }
};
    const fetchVideo = async () => {
    try {
      const response = await(await fetch(`http://127.16.15.14:5072/niggacademy/contenido/${nombreVideo['curso']}/${nombreVideo['seccion']}/${nombreVideo['video']}`, {
          method: "GET",
          headers: {
              'Accept-version': '1.0.0',
              'Authorization': `Bearer ${localStorage.token}`
          }
      })).json();
      setData(response);
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
    fetchVideo();
  }, []);
  return (
    <>
      <Navegadora />
      <div className="lotienetodo">
        <div className="videopaver">
          <div className="cargando">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nYnLVWXmRm8?si=4piUUeWeyM8uH67k"></iframe>
          </div>
          <button className="ola" onClick={toggleVideosVisibility}>
          →
          </button>
        </div>
        <div className={`videos ${videosVisible ? '' : 'hidden'}`}>
          <div className="demasvideos">
            <table>
                <tbody>
                    {info !== null ? (
                    info.map((item, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td><h3><Link to={`/contenido/${nombreVideo['curso']}/${nombreVideo['seccion']}/${item.nombre}`} onClick={() => fetchVideo()}>{item.nombre}</Link></h3></td>
                        </tr>
                        </React.Fragment>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="2" className="wrapper">
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
{/* <table>
                <tbody>
                    <tr>
                        <td><h3>Titulo</h3></td>
                    </tr>
                </tbody>
            </table> */}
export default Video;