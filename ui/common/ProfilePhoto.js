import { Row, Col, Button } from 'antd';
import Spinner from '@ui/common/Spinner';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';
import { personService } from '@services/person.service';
import Image from 'next/image';

const PLACEHOLDER = `/assets/images/profile.png`;

const ProfilePhoto = ({ person }) => {
  const [loading, setLoading] = useState(false);
  const [record] = useState(person);
  const [preview, setPreview] = useState(person?.photo || PLACEHOLDER);
  const { enqueueSnackbar } = useSnackbar();

  const toBase64 = async (image) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const checkSize = (size) => {
    if (size > 2000000)
      snackbar.error(
        enqueueSnackbar,
        'La imagen no puede pesar mas de 1 MegaByte (MB)',
      );
  };

  const parsePhoto = async (event) => {
    const file = event.target.files[0];
    checkSize(file.size);
    return await toBase64(file);
  };

  const onChangeImage = async (event) => {
    if (!person) {
      snackbar.error(
        enqueueSnackbar,
        'No fue posible identificar su registro personal en el sistema ',
      );
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const photo = await parsePhoto(event);
      const result = await personService.updatePhoto(record.id, photo);
      setPreview(result.photo || PLACEHOLDER);
      snackbar.success(enqueueSnackbar, 'Foto modificada');
    } catch (error) {
      snackbar.error(enqueueSnackbar, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 9 }}>
      <Row gutter={[8, 8]} style={{ marginTop: 3, marginBottom: 5 }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={preview}
            width={130}
            height={130}
            alt="profile"
            style={{ borderRadius: '50%' }}
          />
        </Col>
        <Col
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -130,
          }}
        >
          {loading && <Spinner size={50} thickness={4} />}
        </Col>
        <Col
          xs={24}
          style={{ display: 'flex', justifyContent: 'center', marginTop: -20 }}
        >
          <input
            accept="image/jpeg, image/jpg"
            style={{ display: 'none' }}
            id="photo"
            type="file"
            onChange={(event) => {
              onChangeImage(event);
            }}
          />
          <label htmlFor="photo">
            <Button type="primary" size="small" component="span">
              CAMBIAR
            </Button>
          </label>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePhoto;
