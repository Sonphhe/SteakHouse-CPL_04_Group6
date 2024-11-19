import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext'

const Profile = () => {
  const { currentAccount, setCurrentAccount } = useSteakHouseContext()

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentAccount({
          username: currentAccount?.username as string,
          password: currentAccount?.password as string,
          roleId: currentAccount?.roleId as number,
          image: reader.result as string,
          id: currentAccount?.id as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className='profile-detail-title'>
        <h3>My Profile</h3>
        <p>Manage profile information to secure your account</p>
      </div>
      <div className='profile-detail-content'>
        <div className='table'>
          <table>
            <tr>
              <th>User name</th>
              <td>{currentAccount?.username}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>
                <input type='text' placeholder='Your Name' />
              </td>
            </tr>
            <tr>
              <th>User name</th>
              <td>so1212</td>
            </tr>
            <tr>
              <th>User name</th>
              <td>so1212</td>
            </tr>
          </table>
        </div>
        <div className='profile-detail-img'>
          <img src={currentAccount?.image} alt='' />
          <input
            className='choose-image'
            type='file'
            accept='image/jpeg, image/png'
            onChange={handleChangeImage}
            // style={{ display: 'none' }}
            id='image-upload'
          />
          <button onClick={() => document.getElementById('image-upload')?.click()}>Choose Image</button>
          <div>
            <p>Maximum file size 1 MB.</p>
            <p>Format:. JPEG, .PNG</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
