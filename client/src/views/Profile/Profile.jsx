import { useState } from "react";
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
  const [, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [completeUser, setCompleteUser] = useState({});

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
    setEmail("");
    setSelectedImage(null);
  };

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
    setLoading(false);
    return result;
  };

  const updateName = async () => {
    const name = {
      name: firstName,
    };
    await dispatch(updateUser(name, completeUser._id));
  };

  const updateImage = async () => {
    if (selectedImage) {
      const result = await uploadImage(selectedImage);
      let updatedUser;
      if (firstName !== completeUser.name && firstName !== "") {
        updatedUser = {
          photoURL: result.secure_url,
          name: firstName,
        };
      } else {
        updatedUser = {
          photoURL: result.secure_url,
          name: completeUser.name,
        };
      }

      await dispatch(updateUser(updatedUser, completeUser._id));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await Promise.all([updateName(), updateImage()]);
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center select-none">
      <Container>
        <FormGroup>
          <div>
            <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
              <div className="flex flex-wrap sm:flex-row md:flex-wrap border-b py-5 sm:items-start">
                <div className="flex-shrink-0 mr-auto sm:py-3">
                  <p className="font-medium">Account Details</p>
                  <p className="text-sm text-gray-600">Edit your profile</p>
                </div>
                <button
                  className="text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center mr-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-black hover:bg-neutral-800 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 border-b py-4">
                <p className="shrink-0 w-full sm:w-32 font-medium">Name</p>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                />
              </div>
  
              <div className="flex flex-wrap sm:flex-row md:flex-wrap gap-4 py-4 lg:flex-row">
                <div className="shrink-0 w-full sm:w-32 sm:py-4">
                  <p className="mb-auto font-medium">Avatar</p>
                  <p className="text-sm text-gray-600">Change your avatar</p>
                </div>
                <div className="flex flex-wrap flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center w-full sm:w-auto mx-auto">
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
                        <Image className="rounded-full w-20 h-20 max-full">
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
