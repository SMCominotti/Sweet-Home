import { useState } from "react";
import style from "./Profile.module.css";
import { useAuth } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import { Container, FormGroup } from "reactstrap";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserByUid, updateUser } from "../../Redux/actions/actions";

const Profile = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [completeUser, setCompleteUser] = useState({});
  const [, setCloudinaryURL] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(getUserByUid(user.uid)).then((response) => {
        setCompleteUser(response.payload);
      });
    }
  }, [dispatch, user]);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setSelectedImage(null);
  };
  console.log(firstName);
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "SweetHome");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dt8snufoj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();
    setImage(result.secure_url);
    const hardcodeJson = { photoURL: result.secure_url, name: firstName };
    dispatch(updateUser(hardcodeJson, completeUser._id));
    setCloudinaryURL(result.secure_url);
    setLoading(false);
  };

  const handleName = () => {
    const name = {
      name: firstName,
    };
    dispatch(updateUser(name, completeUser._id));
  };

  const handleSave = async () => {
    if (selectedImage) {
      await uploadImage(selectedImage);
    }
    handleName();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={style.all}>
      <Container>
        <FormGroup>
          <div className={style.container}>
            <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
              <div className="flex flex-col border-b py-5 sm:flex-row sm:items-start">
                <div className="flex-shrink-0 mr-auto sm:py-3">
                  <p className="font-medium">Account Details</p>
                  <p className="text-sm text-gray-600">Edit your profile</p>
                </div>
                <button
                  onClick={handleCancel}
                  className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="shrink-0 w-32 font-medium">Name</p>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                />
                
              </div>
              
              <div className="flex flex-col gap-4 py-4 lg:flex-row">
                <div className="shrink-0 w-32 sm:py-4">
                  <p className="mb-auto font-medium">Avatar</p>
                  <p className="text-sm text-gray-600">Change your avatar</p>
                </div>
                <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                  {selectedImage ? (
                    <>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Image"
                        className="rounded-full w-20 h-20 max-w-full max-h-full"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="mt-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200"
                      >
                        Remove Image
                      </button>
                    </>
                  ) : (
                    <>
                      {completeUser && completeUser.photoURL ? (
                        <CloudinaryContext cloudName="dt8snufoj">
                          <Image
                            publicId={completeUser.photoURL}
                            className="rounded-full w-20 h-20 max-w-full"
                          >
                            <Transformation width="300" crop="scale" />
                          </Image>
                        </CloudinaryContext>
                      ) : (
                        <Image className="rounded-full w-20 h-20 max-w-full">
                          <Transformation width="300" crop="scale" />
                        </Image>
                      )}

                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="max-w-full mt-6 rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                      />
                    </>
                  )}
                  {loading ? (
                    <h3>Loading image...</h3>
                  ) : (
                    <h3>Upload an image</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FormGroup>
      </Container>
    </div>
  );
};

export default Profile;
