import { useState } from 'react';
import FileUpload from './FileUpload';
import Flex from '../layout/Flex';
import Image from '../Image';
import Icon from '../Icon';
import Loader from '../Loader';

const ImageUpload = props => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState();

  const handleUpload = file => {
    setUploading(true);
    var formData = new FormData();
    formData.append('file', file);
    props.handleFileUpload(formData);
  };

  if (loading || uploading) {
    return (
      <div
        style={{
          position: 'relative',
          paddingBottom: '67%',
          background: '#f9f9f9',
          border: '1px solid #e5e6e5',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <Loader
          dimmed
          active
          size='small'
          content={uploading ? 'Uploading...' : 'Loading...'}
        />
      </div>
    );
  }

  if (error) {
    setTimeout(() => {
      setError();
    }, 3000);
    return (
      <div
        style={{
          position: 'relative',
          paddingBottom: '67%',
          background: '#f9f9f9',
          border: '1px solid #e5e6e5',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <Loader
          dimmed
          active
          size='small'
          content={
            error.code === 'file-too-large'
              ? 'File must be less than 20MB.'
              : error.message
          }
        />
      </div>
    );
  }

  const setImageModalActive = (image, type) => {
    dispatch({
      type: 'IMAGE_MODAL',
      payload: { active: true, data: { image: image, type: type } },
    });
  };

  if (!error && response?.data) {
    let mimetype = response.headers['content-type'];

    const encodeImage = arrayBuffer => {
      if (mimetype === 'application/pdf') {
        return URL.createObjectURL(
          new Blob([arrayBuffer], { type: 'application/pdf' })
        );
      } else {
        let b64encoded = btoa(
          [].reduce.call(
            new Uint8Array(arrayBuffer),
            function (p, c) {
              return p + String.fromCharCode(c);
            },
            ''
          )
        );
        return 'data:' + mimetype + ';base64,' + b64encoded;
      }
    };

    const data = encodeImage(response.data);

    return (
      <div
        style={{
          position: 'relative',
          paddingBottom: '67%',
          background: '#f9f9f9',
          border: '1px solid #e5e6e5',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        {mimetype === 'application/pdf' ? (
          <object
            data={data}
            type='application/pdf'
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
            aria-label='document'
          />
        ) : (
          <Image
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              minHeight: '100%',
              objectFit: 'cover',
            }}
            src={props.fileUrl}
            fluid
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2,
            background: 'rgba(249, 249, 249, .6)',
            borderBottomLeftRadius: '5px',
          }}
        >
          <Flex direction='row-reverse'>
            <div>
              <FileUpload
                loading={loading}
                style={{ cursor: 'pointer', padding: '0.5em 0.75em' }}
                handleError={setError}
                handleUpload={handleUpload}
              >
                <span className='visually-hidden'>Replace document</span>
                <Icon name='upload' color='blue' fitted />
              </FileUpload>
            </div>
            <button
              className='button--transparent'
              onClick={() => setImageModalActive(data, mimetype)}
            >
              <span className='visually-hidden'>View document</span>
              <Icon name='eye' color='blue' fitted />
            </button>
            {props.children}
          </Flex>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <FileUpload
        loading={loading}
        handleUpload={handleUpload}
        handleError={setError}
        style={{ cursor: 'pointer' }}
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '67%',
            background: '#f9f9f9',
            border: '1px solid #e5e6e5',
            borderRadius: '5px',
          }}
        >
          <Flex
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            alignment='center'
            justify='center'
          >
            <Flex.Column grow={0}>
              <Icon
                style={{ width: '100%', margin: 'auto' }}
                name='upload'
                color='blue'
              />
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '.75em',
                  textTransform: 'uppercase',
                }}
              >
                Upload Document
              </p>
            </Flex.Column>
          </Flex>
        </div>
      </FileUpload>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 2,
          background: 'rgba(249, 249, 249, .6)',
          borderBottomLeftRadius: '5px',
          padding: '0.5em 0',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ImageUpload;
