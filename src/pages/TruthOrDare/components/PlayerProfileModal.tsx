import { useState } from 'react';
import { PlayerProfile } from '../types/game';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: PlayerProfile) => void;
  player: string;
}

type ProfileFields = Omit<PlayerProfile, 'name'>;
type ProfileFieldKey = keyof ProfileFields;

const PlayerProfileModal = ({ isOpen, onClose, onSave, player }: PlayerProfileModalProps) => {
  const [profile, setProfile] = useState<PlayerProfile>({
    name: player,
    interests: [],
    hobbies: [],
    favorites: [],
    secrets: [],
    dares: []
  });

  const [activeField, setActiveField] = useState<ProfileFieldKey | null>(null);
  const [inputValues, setInputValues] = useState<Record<ProfileFieldKey, string>>({
    interests: '',
    hobbies: '',
    favorites: '',
    secrets: '',
    dares: ''
  });
  const [showPrompts, setShowPrompts] = useState<Record<ProfileFieldKey, boolean>>({
    interests: false,
    hobbies: false,
    favorites: false,
    secrets: false,
    dares: false
  });

  const handleFieldClick = (field: ProfileFieldKey) => {
    setActiveField(field);
    setShowPrompts(prev => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field: ProfileFieldKey, value: string) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (field: ProfileFieldKey) => {
    const value = inputValues[field];
    if (value?.trim()) {
      setProfile(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setInputValues(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  const fields = Object.keys(profile).filter(key => key !== 'name') as ProfileFieldKey[];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Player Profile: {player}</h2>
        
        {fields.map((field) => (
          <div key={field} className="mb-4">
            <h3 className="text-lg font-semibold capitalize mb-2">{field}</h3>
            <div className="flex flex-wrap gap-2">
              {profile[field].map((item, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {item}
                </span>
              ))}
            </div>
            {showPrompts[field] && (
              <div className="mt-2">
                <input
                  type="text"
                  value={inputValues[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                  placeholder={`Add ${field}`}
                />
                <button
                  onClick={() => handleAddItem(field)}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
            )}
            {!showPrompts[field] && (
              <button
                onClick={() => handleFieldClick(field)}
                className="text-purple-600 underline mt-2"
              >
                Add {field}
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(profile)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileModal;