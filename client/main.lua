---------------------
--    CO MAVEN     --
-- GITHUB : COKLUK --
-- S 4 L E H#4119  --
---------------------

ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
		
        if IsControlJustReleased(0, 289) then
 
		    for i = 19, 20 do 
             HideHudComponentThisFrame(i)
            end
		    ESX.TriggerServerCallback("S4.GET.PLAYER.INV", function(data)
			  SendNUIMessage({ name="S4.LOAD.INV", data = json.encode(data) })
			  SetNuiFocus(true, true)
		    end)
 
           Wait(1000)
        end
		
    end

end)


RegisterNUICallback("useItem", function(data, cb)
   TriggerServerEvent("S4.USE.INV", data)
end)
 
RegisterNUICallback("deleteItem", function(data, cb)
   TriggerServerEvent("S4.REMOVE.INV", data)
end)

RegisterNUICallback("RefreshInventory", function(data, cb)
   Wait(100)
   ESX.TriggerServerCallback("S4.GET.PLAYER.INV", function(data)
	    SendNUIMessage({ name="S4.LOAD.INV", data = json.encode(data) })
		SetNuiFocus(true, true)
   end)
end)

RegisterNUICallback("ChangeSlot", function(data, cb)
    TriggerServerEvent("S4.CHANGESLOT.INV", data)
end)

RegisterNUICallback("exit", function(data, cb)
    SetNuiFocus(false, false)
end)