import { useEffect, useState } from 'react'
import { Modal, Row, Col, Image, Alert } from 'react-bootstrap'
import Api from '../../api/api'

export default function UserInfo(props) {
  const [info, setInfo] = useState('')

  useEffect(() => {
    props.setError('')
    Api.get(`/users/${props.login}`).then((res) => {
      setInfo(res.data)
    }).catch((err) => props.setError(err.message))
  }, [props.login])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.error ? <Alert variant="danger">{props.error}</Alert> : props.login}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="align-items-center">
          <Col>
            <p>Описание: {info.bio}</p>
            <p>Почта: {info.email}</p>
            <p>Подписчики: {info.followers}</p>
            <p>Репозитории: {info.public_repos}</p>
          </Col>
          <Col md={4}>
            <Image src={info.avatar_url} className="img-fluid" rounded />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
