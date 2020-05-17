import React, { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import '../Profile.css';
import '../ProfileMedia.css';
import editIcon from '../../../assets/images/editIcon.svg';
import saveIcon from '../../../assets/images/saveIcon.svg';

const ProfileContacts = (props) => {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => {
    setEditMode(true)
  }

  const onSubmit = (formData) => {
    props.updateProfile(formData).then(()=> {
      setEditMode(false)
    })
  }

  return (
    <div className='contacts'>
      {!editMode
        ? <Contacts activateEditMode={activateEditMode} profile={props.profile} isOwner={props.isOwner}/>
        : <ContactsReduxForm onSubmit={onSubmit} initialValues={props.profile} contacts={props.profile.contacts} />
      }
    </div>
  )
};


const Contacts = (props) => {
  return (
    <div className='contactsBody'>
      <div className='aboutMeBlock'>
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>Full Name</div><div className='aboutMeInfo'>{props.profile.fullName}</div>
        </div>
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>Looking for a job</div><div className='aboutMeInfo'>{props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
        </div>
        {props.profile.lookingForAJob &&
          <div className='aboutMeItem'>
            <div className='aboutMeTitle'>My professional skills</div><div className='aboutMeInfo'>{props.profile.lookingForAJobDescription}</div>
          </div>
        }
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>About Me</div><div className='aboutMeInfo'>{props.profile.aboutMe}</div>
        </div>
      </div>
      <div className='contactsBlock'>
        {Object.keys(props.profile.contacts).map(key =>
          <div key={key} className='contactsItem'>
            <div>{key}</div>
            <div>
              {props.profile.contacts[key]
                ? <a href={props.profile.contacts[key]} target="_blank" rel="noopener noreferrer">{props.profile.contacts[key]}</a>
                : <span>empty</span>
              }
            </div>
          </div>
        )}
      </div>
      {props.isOwner &&
        <div className='contactsButton'>
          <img src={editIcon} onClick={() => props.activateEditMode()} alt=''/>
        </div>
      }
      
    </div>
  )
};


const ContactsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className='contactsBody'>
      {props.error &&
        <div className='contactsError'>{props.error}</div>
      }
      <div className='aboutMeBlock'>
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>Full Name</div>
          <Field className='aboutMeField' name={'fullName'} component='input' autoComplete="off"/>
        </div>
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>Looking for a job</div>
          <Field className='aboutMeField' name={'lookingForAJob'} component='input' type='checkbox' autoComplete="off"/>
        </div>
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>My professional skills</div>
          <Field className='aboutMeField' name={'lookingForAJobDescription'} component='textarea' />
        </div>
        <div className='aboutMeItem'>
          <div className='aboutMeTitle'>About Me</div>
          <Field className='aboutMeField' name={'aboutMe'} component='textarea' />
        </div>
      </div>

      <div className='contactsBlock'>
      {Object.keys(props.contacts).map(key =>
        <div key={key} className='contactsItem'>
          <div>{key}</div>
          <Field className='aboutMeField' name={'contacts.' + key} 
          component='input' placeholder={'add ' + key + ' link'}  autoComplete="off"/>
        </div>
      )}
      </div>
      <div className='contactsButton'>
        <button></button>
        <img className='saveButton' src={saveIcon} alt=''/>
      </div>
    </form>
  )
};

const ContactsReduxForm = reduxForm({ form: 'contacts' })(ContactsForm)




export default ProfileContacts;
